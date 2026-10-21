// Automatic customer replies — deterministic templates, no LLM.
//
// The site is a lead-generation property: nobody on our side climbs a roof.
// So every automatic reply is honest about what happens next:
//
//   • Referral mode (default): the customer gets two established Outaouais
//     roofers to call, and is asked to mention us. Serves the customer the
//     same day and builds the lead-volume proof we pitch to a future client.
//   • Partner mode (PARTNER_NAME + PARTNER_PHONE and/or PARTNER_EMAIL set):
//     the lead is forwarded to the partner and the customer is told the
//     partner will call to confirm an inspection and a quote.
//
// Stages:
//   handoff  — first contact (form, voicemail, or first text)
//   followup — any later message from the same person

import { siteConfig } from "@/lib/site.config";

export type Lang = "fr" | "en";
export type Stage = "handoff" | "followup";

export const REFERRALS = [
  { name: "Toitures Cossette", phone: "819-777-7177", url: "toiturescossette.ca" },
  { name: "Toitures D.S.", phone: "819-525-9401", url: "toituresds.ca" },
];

export function partner(): { name: string; phone?: string; email?: string } | null {
  const name = process.env.PARTNER_NAME;
  const phone = process.env.PARTNER_PHONE;
  const email = process.env.PARTNER_EMAIL;
  if (!name || (!phone && !email)) return null;
  return { name, phone, email };
}

// Crude but good enough for SMS: French unless the text looks English.
export function detectLang(text: string, fallback: Lang = "fr"): Lang {
  const t = ` ${text.toLowerCase()} `;
  const en = (t.match(/ (the|and|please|thanks|thank you|hi|hello|i need|roof|leak|leaking|shingles|quote|estimate|when|address) /g) || []).length;
  const fr = (t.match(/ (le|la|les|et|merci|bonjour|svp|s'il|toit|toiture|fuite|bardeaux|soumission|adresse|semaine|quand) /g) || []).length;
  if (en > fr) return "en";
  if (fr > en) return "fr";
  return fallback;
}

const brand = (lang: Lang) => siteConfig[lang]?.brandName || siteConfig.city;

export function smsReply(lang: Lang, stage: Stage): string {
  const p = partner();
  const b = brand(lang);
  const [a, c] = REFERRALS;
  if (lang === "fr") {
    if (stage === "handoff") {
      if (p) return `${b} : merci, c'est noté! Notre partenaire ${p.name} vous contacte sous peu pour planifier l'inspection et la soumission. Pour toute question : info@${siteConfig.domain}. – Jérôme`;
      return `${b} : merci, c'est noté! Pour une soumission rapide, voici 2 couvreurs établis en Outaouais : ${a.name} ${a.phone} ou ${c.name} ${c.phone} (les deux offrent un service d'urgence 24/7). Dites que vous venez de ${b}. – Jérôme`;
    }
    if (p) return `${b} : merci! ${p.name} a bien vos coordonnées et vous contacte sous peu. Pour toute autre question : info@${siteConfig.domain}. – Jérôme`;
    return `${b} : merci! Nos couvreurs recommandés : ${a.name} ${a.phone} · ${c.name} ${c.phone}. Pour toute autre question : info@${siteConfig.domain}. – Jérôme`;
  }
  if (stage === "handoff") {
    if (p) return `${b}: thanks, got it! Our partner ${p.name} will contact you shortly to schedule the inspection and quote. Questions: info@${siteConfig.domain}. – Jérôme`;
    return `${b}: thanks, got it! For a fast quote, here are 2 established Outaouais roofers: ${a.name} ${a.phone} or ${c.name} ${c.phone} (both offer 24/7 emergency service). Mention ${b}. – Jérôme`;
  }
  if (p) return `${b}: thanks! ${p.name} has your details and will be in touch shortly. Other questions: info@${siteConfig.domain}. – Jérôme`;
  return `${b}: thanks! Our recommended roofers: ${a.name} ${a.phone} · ${c.name} ${c.phone}. Other questions: info@${siteConfig.domain}. – Jérôme`;
}

// Email version of the handoff (form leads). Returns plain text; the caller
// wraps it in HTML.
export function emailHandoff(lang: Lang, firstName: string, comment: string): { subject: string; text: string } {
  const p = partner();
  const b = brand(lang);
  const [a, c] = REFERRALS;
  const quoted = comment ? (lang === "fr" ? `\n« ${comment} »\n` : `\n"${comment}"\n`) : "";
  if (lang === "fr") {
    const next = p
      ? `Notre partenaire ${p.name} a reçu votre demande et vous contactera sous peu pour planifier l'inspection et vous remettre une soumission.`
      : `Pour une soumission rapide, voici deux couvreurs établis en Outaouais que nous recommandons :

• ${a.name} — ${a.phone} — ${a.url}
• ${c.name} — ${c.phone} — ${c.url}

Les deux offrent un service d'urgence 24/7 (fuite, dommages de tempête). Dites-leur que vous venez de ${b}.`;
    return {
      subject: `Votre demande de toiture — ${b}`,
      text: `Bonjour ${firstName},

Merci d'avoir communiqué avec nous via ${siteConfig.domain}. Nous avons bien reçu votre demande :${quoted}
${next}

Si vous avez une question, répondez à ce courriel ou écrivez-nous par texto au ${siteConfig.phoneDisplay}.

Merci,
Jérôme
${b}
${siteConfig.phoneDisplay} · ${siteConfig.domain}`,
    };
  }
  const next = p
    ? `Our partner ${p.name} has your request and will contact you shortly to schedule the inspection and provide a quote.`
    : `For a fast quote, here are two established Outaouais roofers we recommend:

• ${a.name} — ${a.phone} — ${a.url}
• ${c.name} — ${c.phone} — ${c.url}

Both offer 24/7 emergency service (leaks, storm damage). Tell them you came from ${b}.`;
  return {
    subject: `Your roofing request — ${b}`,
    text: `Hi ${firstName},

Thanks for reaching out through ${siteConfig.domain}. We've received your request:${quoted}
${next}

Any question, reply to this email or text us at ${siteConfig.phoneDisplay}.

Thanks,
Jérôme
${b}
${siteConfig.phoneDisplay} · ${siteConfig.domain}`,
  };
}

export function textToHtml(text: string): string {
  const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text.split("\n").map((l) => (l.trim() === "" ? "<br/>" : `<p style="margin:0 0 10px">${esc(l)}</p>`)).join("");
}
