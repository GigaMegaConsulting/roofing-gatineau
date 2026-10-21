import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";
import { parseTwilioForm, outboundBodiesTo } from "@/lib/twilio";
import { brevoSend, esc, TO_EMAIL_DEFAULT } from "@/lib/brevo";
import { smsReply, detectLang, REFERRALS, partner } from "@/lib/reply";

// Inbound SMS webhook. Every text gets an automatic reply (TwiML <Message>)
// and is forwarded to the owner inbox with a machine-readable blob.
//   first text from a number → "handoff" (referral list or partner notice)
//   later texts              → "followup"

export const runtime = "nodejs";

const xml = (body: string) => new NextResponse(body, { headers: { "Content-Type": "text/xml; charset=utf-8" } });
const escXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let p: Record<string, string> = {};
  try {
    p = await parseTwilioForm(req);
  } catch (err) {
    console.error("[sms] failed to parse body", err);
    return xml(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`);
  }

  const from = p.From || "";
  const body = (p.Body || "").trim().slice(0, 2000);
  const lang = detectLang(body);
  const brandFr = siteConfig.fr?.brandName || siteConfig.city;

  // Stage: did this number already receive a handoff?
  const prior = await outboundBodiesTo(siteConfig.phone, from);
  const marker = partner()?.name || REFERRALS[0].name;
  const stage = prior.some((b) => b.includes(marker)) ? "followup" : "handoff";
  const reply = smsReply(lang, stage);

  const record = JSON.stringify({
    domain: siteConfig.domain, niche: siteConfig.niche, city: siteConfig.city, state: siteConfig.state,
    channel: "sms", from, body, messageSid: p.MessageSid, autoReplyStage: stage, autoReply: reply, createdAt: new Date().toISOString(),
  });
  const blob = `<!--SMSJSON:${Buffer.from(record).toString("base64")}:SMSJSON-->`;
  const text = [`New SMS on ${siteConfig.domain}`, `From: ${from}`, "", body, "", `Auto-reply (${stage}): ${reply}`].join("\n");
  const html = `<h2>New SMS from ${esc(from)}</h2><p><strong>Site:</strong> ${esc(siteConfig.domain)}</p>` +
    `<p style="white-space:pre-wrap">${esc(body)}</p><hr/><p><strong>Auto-reply (${stage}):</strong><br/>${esc(reply)}</p>${blob}`;
  const n = await brevoSend({
    from: { email: process.env.LEAD_FROM_EMAIL || `noreply@${siteConfig.domain}`, name: `${siteConfig.city} Leads` },
    to: { email: process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT },
    subject: `Texto reçu — ${brandFr} (${from})`, text, html,
  });
  if (!n.ok) console.error("[sms] owner notification failed:", n.error);

  return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escXml(reply)}</Message></Response>`);
}

export async function GET() {
  return new NextResponse("sms webhook ready", { status: 200 });
}
