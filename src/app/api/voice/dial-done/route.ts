import { NextResponse } from "next/server";
import { parseTwilioForm } from "@/lib/twilio";
import { voicemailTwiml } from "@/lib/voice";

// <Dial action> — runs when the forwarded leg ends. If the partner answered
// (DialCallStatus=completed) the conversation already happened: hang up.
// Anything else (no-answer, busy, failed, canceled) → voicemail, so a missed
// trial call still becomes a recorded, texted lead.

const xmlHeaders = { "Content-Type": "text/xml; charset=utf-8" };

export async function POST(req: Request) {
  let p: Record<string, string> = {};
  try { p = await parseTwilioForm(req); } catch { /* fall through to voicemail */ }
  if (p.DialCallStatus === "completed") {
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>`, { headers: xmlHeaders });
  }
  return new NextResponse(voicemailTwiml(), { headers: xmlHeaders });
}

export async function GET() {
  return new NextResponse(voicemailTwiml(), { headers: xmlHeaders });
}
