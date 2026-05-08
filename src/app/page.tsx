import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site.config";

// Root URL — redirect to the primary language. Search engines hit /<primaryLang>
// directly via the sitemap; this just handles direct visits to "/".
export default function RootRedirect() {
  redirect(`/${siteConfig.primaryLang}`);
}
