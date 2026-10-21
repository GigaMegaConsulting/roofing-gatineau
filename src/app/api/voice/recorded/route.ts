import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";
import { sendSms, parseTwilioForm, outboundBodiesTo } from "@/lib/twilio";
import { smsReply, REFERRALS, partner } from "@/lib/reply";

// <Record action="/api/voice/recorded"> — fires the moment a voicemail ends.
// Texts the caller immediately (handoff on first contact, followup after),
// then returns the farewell TwiML. Transcription + owner email happen in
// /api/voice/recording-ready once Twilio has finished storing the audio.

export const runtime = "nodejs";

function twiml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Chantal" language="fr-CA">Merci, un texto avec les prochaines étapes vous est envoyé à l'instant.</Say>
  <Say voice="Polly.Joanna" language="en-US">Thanks, a text with next steps is on its way to you now.</Say>
  <Hangup/>
</Response>`;
}
const xml = (b: string) => new NextResponse(b, { headers: { "Content-Type": "text/xml; charset=utf-8" } });

export async function POST(req: Request) {
  let p: Record<string, string> = {};
  try {
    p = await parseTwilioForm(req);
  } catch (err) {
    console.error("[voice/recorded] failed to parse body", err);
  }
  const from = p.From || "";
  if (/^\+\d{8,15}$/.test(from)) {
    const prior = await outboundBodiesTo(siteConfig.phone, from);
    const marker = partner()?.name || REFERRALS[0].name;
    const stage = prior.some((b) => b.includes(marker)) ? "followup" : "handoff";
    const r = await sendSms({ from: siteConfig.phone, to: from, body: smsReply("fr", stage) });
    if (!r.ok) console.error("[voice/recorded] sms failed:", r.error);
  }
  return xml(twiml());
}

export async function GET() {
  return xml(twiml());
}
