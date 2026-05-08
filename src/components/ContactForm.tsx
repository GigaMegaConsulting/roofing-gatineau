// Backwards-compat re-export. Pages that already imported ContactForm get the
// new submit-via-Resend behavior automatically.
import type { Lang } from "@/lib/site.config";
import { QuoteForm } from "./QuoteForm";

interface Props {
  lang: Lang;
  source?: string;
}

export function ContactForm({ lang, source = "contact-form" }: Props) {
  return <QuoteForm lang={lang} source={source} variant="card" />;
}
