// TwiML builders for the site's Twilio number.
//
// Two modes, driven by env on the Vercel project:
//
//   • Trial / client mode — PARTNER_PHONE set (E.164). Calls ring the
//     partner live, with our number as caller ID and a short whisper
//     ("Appel via <brand>, appuyez sur une touche") so only a human picks up
//     and they know where the lead came from. The call is recorded from
//     answer. If nobody answers within 25 s the caller lands in voicemail,
//     which texts them and emails the owner like any other voicemail. This
//     is the "free week, then flat monthly rent" mechanic from the website
//     landlord playbook: the business sees real calls before any deal.
//
//   • Voicemail mode (default) — before a client exists every call becomes a
//     recorded, transcribed lead and the caller gets an automatic text.

import { siteConfig } from "@/lib/site.config";

export function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function partnerPhone(): string | null {
  const p = (process.env.PARTNER_PHONE || "").replace(/[^\d+]/g, "");
  return /^\+\d{8,15}$/.test(p) ? p : null;
}

const brandFr = () => siteConfig.fr?.brandName || siteConfig.city;
const brandEn = () => siteConfig.en?.brandName || siteConfig.city;

export function voicemailTwiml(): string {
  const greetingFr = `Bonjour, vous avez bien rejoint ${brandFr()}. Laissez-nous votre nom, votre adresse et la nature de votre demande après le bip.`;
  const greetingEn = `Hello, you have reached ${brandEn()}. After the beep, please leave your name, address, and what you need.`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Chantal" language="fr-CA">${escapeXml(greetingFr)}</Say>
  <Say voice="Polly.Joanna" language="en-US">${escapeXml(greetingEn)}</Say>
  <Record
    action="/api/voice/recorded"
    method="POST"
    recordingStatusCallback="/api/voice/recording-ready"
    recordingStatusCallbackEvent="completed"
    maxLength="120"
    timeout="5"
    finishOnKey="*"
    playBeep="true"
  />
  <Say voice="Polly.Chantal" language="fr-CA">Merci, nous vous rappellerons sous peu.</Say>
  <Say voice="Polly.Joanna" language="en-US">Thanks, we will get back to you shortly.</Say>
  <Hangup/>
</Response>`;
}

export function forwardTwiml(partner: string): string {
  const e164 = siteConfig.phone.replace(/[^+\d]/g, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="25" callerId="${escapeXml(e164)}" record="record-from-answer" action="/api/voice/dial-done" method="POST">
    <Number url="/api/voice/whisper" method="POST">${escapeXml(partner)}</Number>
  </Dial>
</Response>`;
}

// Played to the partner before the call is bridged. Pressing a key accepts;
// silence (their own voicemail, a busy signal) means no bridge → caller falls
// through to our voicemail instead of leaving a message on the partner's.
export function whisperTwiml(): string {
  const fr = `Appel via ${brandFr()}. Appuyez sur une touche pour accepter.`;
  const en = `Call via ${brandEn()}. Press any key to accept.`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="1" timeout="6">
    <Say voice="Polly.Chantal" language="fr-CA">${escapeXml(fr)}</Say>
    <Say voice="Polly.Joanna" language="en-US">${escapeXml(en)}</Say>
  </Gather>
  <Hangup/>
</Response>`;
}

export function entryTwiml(): string {
  const p = partnerPhone();
  return p ? forwardTwiml(p) : voicemailTwiml();
}
