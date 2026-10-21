// Minimal Twilio REST helper — no SDK, just HTTPS.
// Env (Vercel): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN

function creds(): { sid: string; auth: string } | null {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return { sid, auth: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64") };
}

export async function sendSms(opts: { from: string; to: string; body: string }): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const c = creds();
  if (!c) return { ok: false, error: "TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN not set" };
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${c.sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: c.auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ From: opts.from, To: opts.to, Body: opts.body }).toString(),
    });
    const json = (await res.json().catch(() => ({}))) as { sid?: string; message?: string };
    if (res.ok) return { ok: true, sid: json.sid };
    return { ok: false, error: `HTTP ${res.status} ${json.message || ""}`.trim() };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// Outbound texts we already sent to this number (used to pick the reply stage).
export async function outboundBodiesTo(from: string, to: string): Promise<string[]> {
  const c = creds();
  if (!c) return [];
  try {
    const q = new URLSearchParams({ From: from, To: to, PageSize: "50" }).toString();
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${c.sid}/Messages.json?${q}`, { headers: { Authorization: c.auth }, cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as { messages?: { body: string }[] };
    return (json.messages || []).map((m) => m.body);
  } catch {
    return [];
  }
}

export async function fetchRecordingMp3(recordingSid: string): Promise<ArrayBuffer | null> {
  const c = creds();
  if (!c) return null;
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${c.sid}/Recordings/${recordingSid}.mp3`, { headers: { Authorization: c.auth }, cache: "no-store" });
  if (!res.ok) return null;
  return res.arrayBuffer();
}

// Twilio webhooks arrive as application/x-www-form-urlencoded.
export async function parseTwilioForm(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await req.json()) as Record<string, string>;
  const form = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v);
  return out;
}
