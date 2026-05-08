// Helpers for /[lang]/* routing.
import { siteConfig, availableLangs, type Lang } from "./site.config";

const SUPPORTED: Lang[] = ["fr", "en"];

export function isLang(s: string): s is Lang {
  return (SUPPORTED as string[]).includes(s);
}

// Validate the URL [lang] segment. Returns the Lang if valid AND the site has
// content for it; null otherwise (caller should call notFound()).
export function resolveLang(s: string): Lang | null {
  if (!isLang(s)) return null;
  if (!siteConfig[s]) return null;
  return s;
}

// All static lang segments to prerender for /[lang]/...
export function langStaticParams() {
  return availableLangs().map(lang => ({ lang }));
}
