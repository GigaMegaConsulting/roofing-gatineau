import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site.config";

// Lead intake endpoint. On every form submission it:
//   1. Emails the lead to the owner (LEAD_TO_EMAIL).
//   2. Auto-replies to the customer with an acknowledgement asking for the
//      details the form doesn't capture (address + timing). The customer
//      replying is the qualification signal — a real lead answers, spam
//      doesn't.
//   3. Embeds a machine-readable JSON blob in the owner notification so
//      mission-control can parse leads out of the inbox (it reads the
//      owner mailbox over IMAP — no shared DB needed since mission-control
//      runs locally and the sites run on Vercel).
//
// Mail is sent through Gmail SMTP so it comes from a real branded address
// (info@<domain>, a verified send-as alias on the Workspace account).
//
// Env vars (set on the Vercel project):
//   GMAIL_SMTP_USER  — Workspace account that authenticates (e.g. hello@gigamega.ca)
//   GMAIL_SMTP_PASS  — Google app password for that account
//   LEAD_FROM_EMAIL  — branded From address, e.g. info@<domain>
//                      (must be a verified "send mail as" alias on GMAIL_SMTP_USER)
//   LEAD_TO_EMAIL    — owner inbox for lead notifications

const TO_EMAIL_DEFAULT = "hello@gigamega.ca";

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

  const smtpUser = process.env.GMAIL_SMTP_USER;
  const smtpPass = process.env.GMAIL_SMTP_PASS;
  const fromEmail = process.env.LEAD_FROM_EMAIL || smtpUser || "";
  const to = process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT;

  const brandName =
    siteConfig[lang]?.brandName ??
    siteConfig[lang === "fr" ? "en" : "fr"]?.brandName ??
    siteConfig.domain;

  const createdAt = new Date().toISOString();
  const leadId = `${siteConfig.domain}-${Date.now().toString(36)}`;

  if (!smtpUser || !smtpPass) {
    console.error("[lead] GMAIL_SMTP_USER/PASS not set — cannot send email");
    // 200 so the visitor's form still shows success; we log to fix it.
    return NextResponse.json({ ok: true, leadId, sent: false, reason: "SMTP not configured" });
  }

  // ── Machine-readable record for mission-control (parsed from the inbox).
  const leadJson = JSON.stringify({
    leadId, domain: siteConfig.domain, niche: siteConfig.niche,
    city: siteConfig.city, state: siteConfig.state,
    firstName, lastName, phone, email, comment, source, lang, createdAt,
  });
  const leadBlob = `<!--LEADJSON:${Buffer.from(leadJson).toString("base64")}:LEADJSON-->`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  // ── 1. Owner notification ────────────────────────────────────────────
  const notifyHtml = `
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

  const notifyText = [
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

  let notified = false;
  try {
    await transporter.sendMail({
      from: `${siteConfig.city} Leads <${fromEmail}>`,
      to,
      subject: `Nouveau lead — ${brandName} (${firstName} ${lastName})`.trim(),
      html: notifyHtml,
      text: notifyText,
      replyTo: email || undefined,
    });
    notified = true;
  } catch (err) {
    console.error("[lead] notification send error:", err);
  }

  // ── 2. Customer auto-acknowledgement ─────────────────────────────────
  let autoReplied = false;
  if (email) {
    const ack = buildAck(lang, firstName, comment, brandName, siteConfig.domain, siteConfig.phoneDisplay);
    try {
      await transporter.sendMail({
        from: `${brandName} <${fromEmail}>`,
        to: email,
        subject: ack.subject,
        html: ack.html,
        text: ack.text,
        replyTo: fromEmail,
      });
      autoReplied = true;
    } catch (err) {
      console.error("[lead] auto-reply send error:", err);
    }
  }

  // Always 200 to the visitor — their form succeeded regardless of our
  // downstream email plumbing.
  return NextResponse.json({ ok: true, leadId, notified, autoReplied });
}

// Customer-facing acknowledgement. Niche-agnostic on purpose — asks for the
// address + timing every local-service quote needs, signed by the operator.
function buildAck(
  lang: "fr" | "en",
  firstName: string,
  comment: string,
  brandName: string,
  domain: string,
  phoneDisplay: string,
) {
  if (lang === "fr") {
    const subject = `Nous avons bien reçu votre demande — ${brandName}`;
    const text = `Bonjour ${firstName},

Merci d'avoir communiqué avec nous via ${domain}. Nous avons bien reçu votre demande :

« ${comment} »

Pour vous préparer une soumission rapide et précise, deux petites questions :

1. Quelle est l'adresse (ou le quartier) pour les travaux ?
2. Quand souhaitez-vous faire faire le travail — avez-vous une échéance ?

Répondez simplement à ce courriel avec ces informations et nous vous reviendrons avec un prix fixe.

Merci,
Jérôme
${brandName}
${phoneDisplay} · ${domain}`;
    const html = text.split("\n").map(l =>
      l.trim() === "" ? "<br/>" : `<p style="margin:0 0 10px">${esc(l)}</p>`
    ).join("");
    return { subject, text, html };
  }
  const subject = `We received your request — ${brandName}`;
  const text = `Hi ${firstName},

Thanks for reaching out through ${domain}. We've received your request:

"${comment}"

To put together a fast, accurate quote, two quick questions:

1. What's the address (or neighbourhood) for the job?
2. When are you hoping to have it done — any deadline?

Just reply to this email with those details and we'll get back to you with a fixed price.

Thanks,
Jérôme
${brandName}
${phoneDisplay} · ${domain}`;
  const html = text.split("\n").map(l =>
    l.trim() === "" ? "<br/>" : `<p style="margin:0 0 10px">${esc(l)}</p>`
  ).join("");
  return { subject, text, html };
}
