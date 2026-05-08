import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site.config";

// Resend env vars (configure on the Vercel project):
//   RESEND_API_KEY    — Resend account API key (required)
//   LEAD_TO_EMAIL     — where leads are forwarded (default hello@gigamega.ca)
//   LEAD_FROM_EMAIL   — sender (default onboarding@resend.dev — works without
//                       domain verification, just looks generic. Once you verify
//                       a domain on Resend, set this to leads@<your-domain>.com)

const TO_EMAIL_DEFAULT = "hello@gigamega.ca";
const FROM_EMAIL_DEFAULT = "onboarding@resend.dev";

interface LeadPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  comment?: string;
  source?: string; // "hero" | "contact-page" | etc.
  lang?: "fr" | "en";
}

function s(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 2000) : "";
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

  // Minimum-viable validation: must have a name + something contactable.
  if (!firstName || (!phone && !email)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY not set — cannot send email");
    // Return 200 so the user-facing form shows success even if our email infra
    // is misconfigured. We log for ourselves to fix.
    return NextResponse.json({ ok: true, sent: false, reason: "RESEND_API_KEY missing" });
  }

  const to = process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT;
  const from = `${siteConfig.city} Leads <${process.env.LEAD_FROM_EMAIL || FROM_EMAIL_DEFAULT}>`;
  // Brand lives on the per-language config block; fall back to the other lang or the domain.
  const brandName = siteConfig[lang]?.brandName ?? siteConfig[lang === "fr" ? "en" : "fr"]?.brandName ?? siteConfig.domain;
  const subject = `Nouveau lead — ${brandName} (${firstName} ${lastName})`.trim();

  const html = `
    <h2>New lead from ${siteConfig.domain}</h2>
    <p><strong>Site:</strong> ${brandName}<br/>
       <strong>Niche:</strong> ${siteConfig.niche}<br/>
       <strong>City:</strong> ${siteConfig.city}, ${siteConfig.state}<br/>
       <strong>Source:</strong> ${source} (${lang})</p>
    <hr/>
    <p><strong>Name:</strong> ${firstName} ${lastName}<br/>
       <strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : "—"}<br/>
       <strong>Email:</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : "—"}</p>
    ${comment ? `<p><strong>Message:</strong><br/>${comment.replace(/\n/g, "<br/>")}</p>` : ""}
  `.trim();

  const text = [
    `New lead from ${siteConfig.domain}`,
    `Site: ${brandName}`,
    `Niche: ${siteConfig.niche}`,
    `City: ${siteConfig.city}, ${siteConfig.state}`,
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
    return NextResponse.json({ ok: true, sent: true, id: result.data?.id });
  } catch (err) {
    console.error("[lead] exception:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
