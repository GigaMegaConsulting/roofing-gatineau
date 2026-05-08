import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";

// Twilio Programmable Voice webhook. The Twilio number is configured to POST
// here when a call comes in; we respond with TwiML.
//
// Three modes, selected by env vars (checked in order):
//
//   1. TWILIO_VOICE_MODE=voicemail
//        Greet the caller, record up to 2 min, ask Twilio to transcribe, then
//        POST the transcript to /api/voice/transcribe. Useful when we don't
//        want to ring through to a human — every call becomes a recorded lead
//        that can be auto-replied to over SMS or routed to a paying client.
//
//   2. TWILIO_FORWARD_TO=<E.164 number>
//        Dial that number with the site's published phone as callerId, so the
//        recipient sees which lead-gen site generated the call. callerId must
//        be a Twilio-owned or verified number on the account; the site's
//        published number always satisfies that.
//
//   3. neither set → "not configured" message.

type Mode = "voicemail" | "forward" | "unconfigured";

function resolveMode(): Mode {
  if ((process.env.TWILIO_VOICE_MODE || "").toLowerCase() === "voicemail") return "voicemail";
  if (process.env.TWILIO_FORWARD_TO) return "forward";
  return "unconfigured";
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildTwiml(): string {
  const mode = resolveMode();
  const e164 = siteConfig.phone.replace(/[^+\d]/g, "");

  if (mode === "voicemail") {
    // Bilingual greeting. Each language uses a Polly voice tuned for it so
    // accents are correct. Twilio plays stacked <Say> verbs in order before
    // the <Record> beep.
    //
    // Niche-agnostic by referencing the per-language brand name (set in
    // siteConfig). Examples that result:
    //   "Bonjour, vous avez bien rejoint Couvreur Gatineau. ..."
    //   "Bonjour, vous avez bien rejoint Débarras Gatineau. ..."
    const brandFr = siteConfig.fr?.brandName || siteConfig.city;
    const brandEn = siteConfig.en?.brandName || siteConfig.city;
    const greetingFr = `Bonjour, vous avez bien rejoint ${brandFr}. Laissez-nous votre nom, votre adresse et la nature de votre demande après le bip.`;
    const greetingEn = `Hello, you have reached ${brandEn}. After the beep, please leave your name, address, and what you need.`;
    const farewellFr = "Merci, nous vous rappellerons sous peu.";
    const farewellEn = "Thanks, we will get back to you shortly.";

    // No `action` on <Record> — once recording ends Twilio continues with the
    // next verbs (farewell + hangup).
    //
    // We do NOT use Twilio's transcribe="true" because Twilio's transcription
    // service is English-only and produced garbled output for French
    // messages. Instead, mission-control's voicemails dashboard pulls the
    // recording audio and runs OpenAI Whisper (auto-detects language).
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Chantal" language="fr-CA">${escapeXml(greetingFr)}</Say>
  <Say voice="Polly.Joanna" language="en-US">${escapeXml(greetingEn)}</Say>
  <Record
    maxLength="120"
    timeout="5"
    finishOnKey="*"
    playBeep="true"
  />
  <Say voice="Polly.Chantal" language="fr-CA">${escapeXml(farewellFr)}</Say>
  <Say voice="Polly.Joanna" language="en-US">${escapeXml(farewellEn)}</Say>
  <Hangup/>
</Response>`;
  }

  if (mode === "forward") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="25" callerId="${escapeXml(e164)}">${escapeXml(process.env.TWILIO_FORWARD_TO!)}</Dial>
</Response>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">This number is not currently configured. Please try again later.</Say>
</Response>`;
}

const xmlHeaders = { "Content-Type": "text/xml; charset=utf-8" };

export async function POST() {
  return new NextResponse(buildTwiml(), { headers: xmlHeaders });
}

// Allow GET for manual testing in the browser.
export async function GET() {
  return new NextResponse(buildTwiml(), { headers: xmlHeaders });
}
