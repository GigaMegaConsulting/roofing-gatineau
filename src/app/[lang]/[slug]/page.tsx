import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, availableLangs, type Lang, type ServicePerLang, type LocationPerLang } from "@/lib/site.config";
import { resolveLang } from "@/lib/lang";
import { t } from "@/lib/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageCTA } from "@/components/PageCTA";
import { ContactForm } from "@/components/ContactForm";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { lang: Lang; slug: string }[] = [];
  for (const lang of availableLangs()) {
    const c = siteConfig[lang];
    if (!c) continue;
    for (const s of c.services) params.push({ lang, slug: s.slug });
    for (const loc of c.locations) params.push({ lang, slug: loc.slug });
  }
  return params;
}

interface Found {
  kind: "service" | "location";
  index: number;
  // Per-language entries; populated for every available lang so we can build
  // the language-switcher href from the current page's other-lang counterpart.
  entries: Partial<Record<Lang, ServicePerLang | LocationPerLang>>;
}

function lookup(lang: Lang, slug: string): Found | null {
  const c = siteConfig[lang];
  if (!c) return null;
  const sIdx = c.services.findIndex(s => s.slug === slug);
  if (sIdx !== -1) {
    const entries: Partial<Record<Lang, ServicePerLang>> = {};
    for (const l of availableLangs()) {
      const lc = siteConfig[l];
      if (lc?.services[sIdx]) entries[l] = lc.services[sIdx];
    }
    return { kind: "service", index: sIdx, entries };
  }
  const locIdx = c.locations.findIndex(l => l.slug === slug);
  if (locIdx !== -1) {
    const entries: Partial<Record<Lang, LocationPerLang>> = {};
    for (const l of availableLangs()) {
      const lc = siteConfig[l];
      if (lc?.locations[locIdx]) entries[l] = lc.locations[locIdx];
    }
    return { kind: "location", index: locIdx, entries };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const found = lookup(validated, slug);
  if (!found) return { title: "Not found" };
  const item = found.entries[validated]!;
  const description = "description" in item ? item.description : item.pageHeadline;
  const languages: Record<string, string> = {};
  for (const [l, e] of Object.entries(found.entries)) {
    if (e) languages[l] = `/${l}/${e.slug}`;
  }
  return {
    title: item.pageHeadline,
    description,
    alternates: { canonical: `/${validated}/${slug}`, languages },
  };
}

export default async function SubPage({ params }: Props) {
  const { lang, slug } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const found = lookup(validated, slug);
  if (!found) notFound();

  const tt = t(validated);
  const isService = found.kind === "service";
  const item = found.entries[validated]!;
  const c = siteConfig[validated]!;

  // Build alt-language path mapping for the language switcher
  const altPath: Partial<Record<Lang, string>> = {};
  for (const [l, e] of Object.entries(found.entries)) {
    if (e) altPath[l as Lang] = `/${l}/${e.slug}`;
  }

  const image = isService
    ? siteConfig.serviceImages[found.index]
    : siteConfig.heroImage;
  const breadcrumbLabel = isService ? tt.services : tt.locations;
  const breadcrumbCurrent = isService
    ? (item as ServicePerLang).title
    : siteConfig.locationNames[found.index];

  const paragraphs = item.pageContent
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  // BreadcrumbList JSON-LD — earns the breadcrumb display in SERP and helps
  // Google understand the site hierarchy.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: c.brandName,
        item: `https://${siteConfig.domain}/${validated}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabel,
        item: `https://${siteConfig.domain}/${validated}/${isService ? "services" : "locations"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: breadcrumbCurrent,
        item: `https://${siteConfig.domain}/${validated}/${slug}`,
      },
    ],
  };

  // Service JSON-LD on service pages — produces a rich "service" snippet in
  // SERP. We don't emit it for location pages because schema.org doesn't have
  // a clean "service-area location page" type.
  const serviceLd = isService
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: siteConfig.niche,
        name: (item as ServicePerLang).title,
        description: (item as ServicePerLang).description,
        provider: {
          "@type": "LocalBusiness",
          name: c.brandName,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          url: `https://${siteConfig.domain}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.city,
            addressRegion: siteConfig.state,
            addressCountry: "CA",
          },
        },
        areaServed: siteConfig.locationNames.map(name => ({ "@type": "City", name })),
        offers: {
          "@type": "Offer",
          url: `https://${siteConfig.domain}/${validated}/${slug}`,
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main>
        <section className="bg-white pt-12 md:pt-16 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <nav className="text-sm text-[#5a5a5a] mb-6">
              <Link href={`/${validated}`} className="hover:underline">{c.brandName}</Link>
              <span className="mx-2">/</span>
              <span>{breadcrumbLabel}</span>
              <span className="mx-2">/</span>
              <span>{breadcrumbCurrent}</span>
            </nav>
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-6">{item.pageHeadline}</h1>
          </div>
        </section>

        {image && (
          <section className="bg-white">
            <div className="mx-auto max-w-4xl px-6">
              <Image
                src={image}
                alt={breadcrumbCurrent}
                width={isService ? 1254 : 1536}
                height={isService ? 1254 : 1024}
                sizes="(min-width: 768px) 848px, 100vw"
                className="w-full aspect-[16/9] object-cover rounded-md"
              />
            </div>
          </section>
        )}

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6 text-[#1a1a1a] leading-relaxed text-base md:text-lg space-y-5">
            {paragraphs.length > 0
              ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
              : <p>{item.pageHeadline}</p>}
          </div>
        </section>

        {/* Cross-links: location pages list services, service pages list locations */}
        {!isService ? (
          <section className="bg-[#fafafa] border-y border-[#e6e6e6] py-12">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl md:text-3xl mb-6">
                {tt.ourServices} {breadcrumbCurrent}
              </h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {c.services.map(s => (
                  <li key={s.slug}>
                    <Link
                      href={`/${validated}/${s.slug}`}
                      className="block bg-white border border-[#e6e6e6] rounded-md px-4 py-3 hover:border-black transition"
                    >
                      <span className="font-semibold">{s.title}</span>
                      <span className="text-sm text-[#5a5a5a] block mt-1">{s.description.split(".")[0]}.</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : (
          <section className="bg-[#fafafa] border-y border-[#e6e6e6] py-12">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="font-display text-2xl md:text-3xl mb-6">{tt.serviceArea}</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {c.locations.map((loc, i) => (
                  <li key={loc.slug}>
                    <Link href={`/${validated}/${loc.slug}`} className="block py-1 hover:underline">
                      {siteConfig.locationNames[i]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <PageCTA lang={validated} />
        <section className="bg-white py-16 md:py-20 border-t border-[#e6e6e6]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display text-center text-3xl md:text-4xl mb-3">{tt.contactHeadline}</h2>
            <p className="text-center text-[#5a5a5a] mb-8">{tt.contactSubtitle}</p>
            <ContactForm lang={validated} />
          </div>
        </section>
      </main>
      <Footer lang={validated} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {serviceLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
      )}
    </>
  );
}
