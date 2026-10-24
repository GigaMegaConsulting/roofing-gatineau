import { NextResponse } from "next/server";
import { entryTwiml } from "@/lib/voice";

// Twilio Programmable Voice webhook — the number POSTs here on every call.
// Mode is decided in lib/voice.ts: live forward to PARTNER_PHONE (trial or
// paying client) with voicemail fallback, else straight to voicemail.

const xmlHeaders = { "Content-Type": "text/xml; charset=utf-8" };

export async function POST() {
  return new NextResponse(entryTwiml(), { headers: xmlHeaders });
}

export async function GET() {
  return new NextResponse(entryTwiml(), { headers: xmlHeaders });
}
