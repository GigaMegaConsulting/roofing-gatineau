import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/lib/site.config";

// Root URL — permanent (308) redirect to the primary language. Using
// permanentRedirect instead of redirect because Google was treating the
// temporary 307 as a "duplicate canonical" signal in Search Console,
// preventing /fr from being cleanly indexed as the canonical homepage.
// Search engines hit /<primaryLang> directly via the sitemap anyway;
// this redirect just handles direct visits to "/".
export default function RootRedirect() {
  permanentRedirect(`/${siteConfig.primaryLang}`);
}
