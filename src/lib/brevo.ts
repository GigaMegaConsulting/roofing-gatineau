// Brevo transactional send — shared by the lead form and the SMS webhook.
// Env: BREVO_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL.

export const TO_EMAIL_DEFAULT = "hello@gigamega.ca";

export function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export interface BrevoSendOpts {
  from: { email: string; name: string };
  to: { email: string; name?: string };
  subject: string;
  html: string;
  text: string;
  replyTo?: { email: string };
}

export async function brevoSend(o: BrevoSendOpts): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { ok: false, error: "BREVO_API_KEY not set" };
  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: o.from,
        to: [o.to],
        subject: o.subject,
        htmlContent: o.html,
        textContent: o.text,
        ...(o.replyTo ? { replyTo: o.replyTo } : {}),
      }),
    });
    const body = (await r.json().catch(() => ({}))) as { messageId?: string };
    if (r.status >= 200 && r.status < 300) return { ok: true, id: body.messageId };
    return { ok: false, error: `HTTP ${r.status} ${JSON.stringify(body).slice(0, 300)}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
