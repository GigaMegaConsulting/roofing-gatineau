import { NextRequest, NextResponse } from "next/server";
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
// Both emails go through Brevo's transactional REST API so they come from
// a real branded address (info@<domain>, on a Brevo-authenticated domain).
// No SDK is added — Brevo is just an HTTPS POST.
//
// Env vars (set on the Vercel project):
//   BREVO_API_KEY    — Brevo transactional API key
//   LEAD_TO_EMAIL    — owner inbox for lead notifications
//   LEAD_FROM_EMAIL  — branded From address, e.g. info@<domain>
//                      (must be on a Brevo-authenticated domain)

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

interface BrevoSendOpts {
  apiKey: string;
  from: { email: string; name: string };
  to: { email: string; name?: string };
  subject: string;
  html: string;
  text: string;
  replyTo?: { email: string };
}

async function brevoSend(o: BrevoSendOpts): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": o.apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: o.from,
        to: [o.to],
        subject: o.subject,
        htmlContent: o.html,
        textContent: o.text,
        ...(o.replyTo ? { replyTo: o.replyTo } : {}),
      }),
    });
    const body = await r.json().catch(() => ({}));
    if (r.status >= 200 && r.status < 300) return { ok: true, id: body.messageId };
    return { ok: false, error: `HTTP ${r.status} ${JSON.stringify(body).slice(0, 300)}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
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

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[lead] BREVO_API_KEY not set — cannot send email");
    return NextResponse.json({ ok: true, sent: false, reason: "BREVO_API_KEY missing" });
  }

  const to = process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT;
  const fromEmail = process.env.LEAD_FROM_EMAIL || `noreply@${siteConfig.domain}`;
  const brandName =
    siteConfig[lang]?.brandName ??
    siteConfig[lang === "fr" ? "en" : "fr"]?.brandName ??
    siteConfig.domain;

  const createdAt = new Date().toISOString();
  const leadId = `${siteConfig.domain}-${Date.now().toString(36)}`;

  // Machine-readable record for mission-control (parsed from the inbox).
  const leadJson = JSON.stringify({
    leadId, domain: siteConfig.domain, niche: siteConfig.niche,
    city: siteConfig.city, state: siteConfig.state,
    firstName, lastName, phone, email, comment, source, lang, createdAt,
  });
  const leadBlob = `<!--LEADJSON:${Buffer.from(leadJson).toString("base64")}:LEADJSON-->`;

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

  const notifyRes = await brevoSend({
    apiKey,
    from: { email: fromEmail, name: `${siteConfig.city} Leads` },
    to: { email: to },
    subject: `Nouveau lead — ${brandName} (${firstName} ${lastName})`.trim(),
    html: notifyHtml,
    text: notifyText,
    replyTo: email ? { email } : undefined,
  });
  if (!notifyRes.ok) console.error("[lead] notification send failed:", notifyRes.error);

  // ── 2. Customer auto-acknowledgement ─────────────────────────────────
  let autoReplied = false;
  if (email) {
    const ack = buildAck(lang, firstName, comment, brandName, siteConfig.domain, siteConfig.phoneDisplay);
    const ackRes = await brevoSend({
      apiKey,
      from: { email: fromEmail, name: brandName },
      to: { email, name: `${firstName} ${lastName}`.trim() },
      subject: ack.subject,
      html: ack.html,
      text: ack.text,
      replyTo: { email: fromEmail },
    });
    autoReplied = ackRes.ok;
    if (!ackRes.ok) console.error("[lead] auto-reply send failed:", ackRes.error);
  }

  // Always 200 to the visitor — their form succeeded regardless of our
  // downstream email plumbing.
  return NextResponse.json({ ok: true, leadId, notified: notifyRes.ok, autoReplied });
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
