import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site.config";

// Twilio POSTs here asynchronously when a voicemail recording has been
// transcribed. We collect the useful fields and forward to a webhook (Slack,
// Discord, Make/n8n, etc.) configured via TWILIO_TRANSCRIBE_WEBHOOK. With no
// webhook set we just log to the server console — Twilio also stores the
// recording + transcript on its side, so nothing is lost.
//
// Twilio sends the request as application/x-www-form-urlencoded.

interface TranscribePayload {
  CallSid?: string;
  RecordingSid?: string;
  RecordingUrl?: string;
  RecordingDuration?: string;
  TranscriptionSid?: string;
  TranscriptionText?: string;
  TranscriptionStatus?: string;
  From?: string;
  To?: string;
  CallerCity?: string;
  CallerState?: string;
  CallerCountry?: string;
}

async function parseTwilioBody(req: Request): Promise<TranscribePayload> {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await req.json()) as TranscribePayload;
  }
  const form = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v);
  return out as TranscribePayload;
}

export async function POST(req: Request) {
  let payload: TranscribePayload = {};
  try {
    payload = await parseTwilioBody(req);
  } catch (err) {
    console.error("[voice/transcribe] failed to parse body", err);
    return new NextResponse("ok", { status: 200 });
  }

  const summary = {
    site: siteConfig.domain,
    callSid: payload.CallSid,
    from: payload.From,
    callerLocation: [payload.CallerCity, payload.CallerState, payload.CallerCountry].filter(Boolean).join(", "),
    durationSec: payload.RecordingDuration,
    transcriptionStatus: payload.TranscriptionStatus,
    transcript: payload.TranscriptionText,
    recordingUrl: payload.RecordingUrl,
  };

  console.log("[voice/transcribe]", JSON.stringify(summary));

  const webhook = process.env.TWILIO_TRANSCRIBE_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      });
    } catch (err) {
      console.error("[voice/transcribe] webhook forward failed", err);
    }
  }

  // Twilio expects a 2xx; the response body is ignored for transcribeCallback.
  return new NextResponse("ok", { status: 200 });
}

export async function GET() {
  return new NextResponse("voice/transcribe ready", { status: 200 });
}
