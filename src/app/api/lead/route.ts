import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site.config";

// Lead intake endpoint. On every form submission it:
//   1. Emails the lead to the owner (LEAD_TO_EMAIL) via Resend.
//   2. Embeds a machine-readable JSON blob in the owner notification so
//      mission-control can parse leads out of the inbox (it reads the
//      owner mailbox over IMAP — no shared DB needed since mission-control
//      runs locally and the sites run on Vercel).
//
// Customer auto-acknowledgement is intentionally DEFERRED: it requires
// sending from a branded `info@<domain>` address, and Workspace app
// passwords are disabled on this account so the planned Gmail SMTP path
// is blocked. Next step is a free transactional-mail provider (e.g.
// Brevo) with proper domain verification. Until then we keep this route
// minimal so leads never get silently dropped.
//
// Env vars (set on the Vercel project):
//   RESEND_API_KEY    — Resend API key (required to send anything)
//   LEAD_TO_EMAIL     — owner inbox for lead notifications (default below)
//   LEAD_FROM_EMAIL   — sender, must be on a Resend-verified domain or @resend.dev

const TO_EMAIL_DEFAULT = "hello@gigamega.ca";
const FROM_EMAIL_DEFAULT = "onboarding@resend.dev";

export const runtime = "nodejs";

interface LeadPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  comment?: string;
  source?: string;
  lang?: "fr" | "en";
}

function s(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 2000) : "";
}

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = s(body.firstName);
  const lastName = s(body.lastName);
  const phone = s(body.phone);
  const email = s(body.email);
  const comment = s(body.comment);
  const source = s(body.source) || "form";
  const lang = body.lang === "en" ? "en" : "fr";

  if (!firstName || (!phone && !email)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY not set — cannot send email");
    return NextResponse.json({ ok: true, sent: false, reason: "RESEND_API_KEY missing" });
  }

  const to = process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT;
  const from = `${siteConfig.city} Leads <${process.env.LEAD_FROM_EMAIL || FROM_EMAIL_DEFAULT}>`;
  const brandName =
    siteConfig[lang]?.brandName ??
    siteConfig[lang === "fr" ? "en" : "fr"]?.brandName ??
    siteConfig.domain;
  const subject = `Nouveau lead — ${brandName} (${firstName} ${lastName})`.trim();

  const createdAt = new Date().toISOString();
  const leadId = `${siteConfig.domain}-${Date.now().toString(36)}`;

  // Machine-readable record for mission-control (parsed from the inbox).
  const leadJson = JSON.stringify({
    leadId, domain: siteConfig.domain, niche: siteConfig.niche,
    city: siteConfig.city, state: siteConfig.state,
    firstName, lastName, phone, email, comment, source, lang, createdAt,
  });
  const leadBlob = `<!--LEADJSON:${Buffer.from(leadJson).toString("base64")}:LEADJSON-->`;

  const html = `
    <h2>New lead from ${esc(siteConfig.domain)}</h2>
    <p><strong>Site:</strong> ${esc(brandName)}<br/>
       <strong>Niche:</strong> ${esc(siteConfig.niche)}<br/>
       <strong>City:</strong> ${esc(siteConfig.city)}, ${esc(siteConfig.state)}<br/>
       <strong>Source:</strong> ${esc(source)} (${lang})</p>
    <hr/>
    <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}<br/>
       <strong>Phone:</strong> ${phone ? `<a href="tel:${esc(phone)}">${esc(phone)}</a>` : "—"}<br/>
       <strong>Email:</strong> ${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : "—"}</p>
    ${comment ? `<p><strong>Message:</strong><br/>${esc(comment).replace(/\n/g, "<br/>")}</p>` : ""}
    ${leadBlob}
  `.trim();

  const text = [
    `New lead from ${siteConfig.domain}`,
    `Site: ${brandName}`,
    `Niche: ${siteConfig.niche}`,
    `Source: ${source} (${lang})`,
    "",
    `Name: ${firstName} ${lastName}`,
    `Phone: ${phone || "—"}`,
    `Email: ${email || "—"}`,
    comment ? `\nMessage:\n${comment}` : "",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      replyTo: email || undefined,
    });
    if (result.error) {
      console.error("[lead] Resend error:", result.error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, leadId, sent: true, id: result.data?.id });
  } catch (err) {
    console.error("[lead] exception:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
