import type { MetadataRoute } from "next";
import { siteConfig, availableLangs } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteConfig.domain}`;
  const now = new Date();
  const langs = availableLangs();

  // Build hreflang alternates that map every URL to its counterpart in the
  // other language. Search engines use this to serve the right version per user.
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    const c = siteConfig[lang];
    if (!c) continue;

    // Homepage
    entries.push({
      url: `${base}/${lang}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}`])),
      },
    });

    // About + Contact
    for (const path of ["about", "contact"]) {
      entries.push({
        url: `${base}/${lang}/${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}/${path}`])),
        },
      });
    }

    // Services + Locations index hubs (link to all child pages)
    for (const path of ["services", "locations"]) {
      entries.push({
        url: `${base}/${lang}/${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}/${path}`])),
        },
      });
    }

    // FAQ index (long-tail Q&A)
    entries.push({
      url: `${base}/${lang}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}/faq`])),
      },
    });

    // Long-tail guide pages — populated per-niche by the content-gen pipeline.
    // Each guide is a route at /[lang]/<slug>/page.tsx + entry in lib/long-tail-content.ts.
    // The pipeline writes the slugs here when it generates the guides.
    // (No guides yet — leave the array empty until generate-site fills it.)
    for (const path of [] as string[]) {
      entries.push({
        url: `${base}/${lang}/${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}/${path}`])),
        },
      });
    }

    // Services — slugs differ per lang, paired by index
    for (let i = 0; i < c.services.length; i++) {
      entries.push({
        url: `${base}/${lang}/${c.services[i].slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            langs.map(l => [l, `${base}/${l}/${siteConfig[l]!.services[i].slug}`])
          ),
        },
      });
    }

    // Locations — slugs differ per lang, paired by index
    for (let i = 0; i < c.locations.length; i++) {
      entries.push({
        url: `${base}/${lang}/${c.locations[i].slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            langs.map(l => [l, `${base}/${l}/${siteConfig[l]!.locations[i].slug}`])
          ),
        },
      });
    }

    // Legal
    for (const path of ["privacy-policy", "terms-of-use"]) {
      entries.push({
        url: `${base}/${lang}/${path}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(langs.map(l => [l, `${base}/${l}/${path}`])),
        },
      });
    }
  }

  return entries;
}
