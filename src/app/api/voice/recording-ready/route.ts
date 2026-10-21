import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";
import { parseTwilioForm, fetchRecordingMp3, sendSms } from "@/lib/twilio";
import { transcribe } from "@/lib/transcribe";
import { brevoSend, esc, TO_EMAIL_DEFAULT } from "@/lib/brevo";
import { partner } from "@/lib/reply";

// <Record recordingStatusCallback> — Twilio POSTs here once the audio file is
// stored. We transcribe it (ElevenLabs Scribe), email the owner the
// transcript, and in partner mode forward the lead to the partner.

export const runtime = "nodejs";

export async function POST(req: Request) {
  let p: Record<string, string> = {};
  try {
    p = await parseTwilioForm(req);
  } catch (err) {
    console.error("[voice/recording-ready] failed to parse body", err);
    return new NextResponse("ok");
  }
  if (p.RecordingStatus && p.RecordingStatus !== "completed") return new NextResponse("ok");

  const sid = p.RecordingSid || "";
  const from = p.From || p.Caller || "";
  const brandFr = siteConfig.fr?.brandName || siteConfig.city;

  let transcript: { text: string; lang: string } | null = null;
  if (sid) {
    const audio = await fetchRecordingMp3(sid);
    if (audio) transcript = await transcribe(audio);
  }

  const record = JSON.stringify({
    domain: siteConfig.domain, niche: siteConfig.niche, city: siteConfig.city, state: siteConfig.state,
    channel: "voicemail", from, recordingSid: sid, callSid: p.CallSid, durationSec: Number(p.RecordingDuration || 0),
    transcript: transcript?.text || null, lang: transcript?.lang || null, createdAt: new Date().toISOString(),
  });
  const blob = `<!--VMJSON:${Buffer.from(record).toString("base64")}:VMJSON-->`;
  const lines = [
    `New voicemail on ${siteConfig.domain}`,
    `From: ${from}`,
    `Duration: ${p.RecordingDuration || "?"}s · Recording ${sid}`,
    "",
    transcript ? `Transcript (${transcript.lang}):\n${transcript.text}` : "Transcript: unavailable (transcription failed — see Mission Control voicemails tab).",
  ];
  const text = lines.join("\n");
  const html = `<h2>New voicemail from ${esc(from)}</h2><p><strong>Site:</strong> ${esc(siteConfig.domain)} · ${esc(p.RecordingDuration || "?")}s</p>` +
    `<p style="white-space:pre-wrap">${esc(transcript ? transcript.text : "Transcript unavailable.")}</p>${blob}`;
  const n = await brevoSend({
    from: { email: process.env.LEAD_FROM_EMAIL || `noreply@${siteConfig.domain}`, name: `${siteConfig.city} Leads` },
    to: { email: process.env.LEAD_TO_EMAIL || TO_EMAIL_DEFAULT },
    subject: `Nouveau message vocal — ${brandFr} (${from})`, text, html,
  });
  if (!n.ok) console.error("[voice/recording-ready] owner notification failed:", n.error);

  const pt = partner();
  if (pt) {
    const lead = `Nouveau lead ${brandFr} (message vocal) — ${from}${transcript ? ` : ${transcript.text}` : ""}`;
    if (pt.phone) await sendSms({ from: siteConfig.phone, to: pt.phone, body: lead.slice(0, 1500) });
    if (pt.email) await brevoSend({ from: { email: process.env.LEAD_FROM_EMAIL || `noreply@${siteConfig.domain}`, name: brandFr }, to: { email: pt.email }, subject: `Nouveau lead — ${brandFr} (${from})`, text: lead, html: `<p>${esc(lead)}</p>` });
  }
  return new NextResponse("ok");
}

export async function GET() {
  return new NextResponse("recording-ready webhook ready");
}
