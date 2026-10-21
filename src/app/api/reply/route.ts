import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";
import { sendSms } from "@/lib/twilio";
import { smsReply, type Lang, type Stage } from "@/lib/reply";

// POST {to, stage, lang?} with header x-reply-secret — sends the templated
// SMS from the site number. Used by mission-control's daily audit to answer
// anything the real-time webhooks missed. Keeps the templates in one place.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.REPLY_SECRET;
  if (!secret || req.headers.get("x-reply-secret") !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: { to?: string; stage?: Stage; lang?: Lang; preview?: boolean } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid json" }, { status: 400 }); }
  const to = (body.to || "").trim();
  const stage: Stage = body.stage === "followup" ? "followup" : "handoff";
  const lang: Lang = body.lang === "en" ? "en" : "fr";
  const text = smsReply(lang, stage);
  if (body.preview) return NextResponse.json({ ok: true, preview: true, text });
  if (!/^\+\d{8,15}$/.test(to)) return NextResponse.json({ error: "bad 'to'" }, { status: 400 });
  const r = await sendSms({ from: siteConfig.phone, to, body: text });
  return NextResponse.json({ ok: r.ok, sid: r.sid, error: r.error, text });
}
