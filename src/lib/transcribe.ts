// Voicemail transcription via ElevenLabs Scribe (auto-detects FR/EN).
// Env (Vercel): ELEVENLABS_API_KEY
export async function transcribe(audio: ArrayBuffer): Promise<{ text: string; lang: "fr" | "en" | string } | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  try {
    const form = new FormData();
    form.append("file", new Blob([audio], { type: "audio/mpeg" }), "voicemail.mp3");
    form.append("model_id", "scribe_v1");
    const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": key }, body: form });
    if (!res.ok) return null;
    const j = (await res.json()) as { text?: string; language_code?: string };
    if (!j.text) return null;
    const map: Record<string, string> = { fra: "fr", eng: "en" };
    return { text: j.text.trim(), lang: map[j.language_code || ""] || j.language_code || "fr" };
  } catch {
    return null;
  }
}
