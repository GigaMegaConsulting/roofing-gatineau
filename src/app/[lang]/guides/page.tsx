import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import {
  getDamagedRoofSignsGuide,
  getShinglesVsMetalGuide,
  getRoofInspectionGuide,
  getRoofLeakEmergencyGuide,
  getRoofWinterQuebecGuide,
  getRoofWarrantyGuide,
  getCommercialRoofingGuide,
  getAtticVentilationGuide,
  getInsuranceClaimGuide,
  getGuttersGuide,
  type LongFormContent,
} from "@/lib/long-tail-content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageCTA } from "@/components/PageCTA";

interface Props {
  params: Promise<{ lang: string }>;
}

// Dedicated hub page for the long-tail guide cluster. Lives at
// /[lang]/guides as a standalone landing target for queries like
// "guides toiture Gatineau" + a strong internal-link hub that ranks
// independently from the individual guides.
//
// Order is intent-first: emergency / decision-making content at the top,
// preventive and technical content at the bottom.
const GUIDES: Array<{ slug: string; content: (l: Lang) => LongFormContent; category: { fr: string; en: string } }> = [
  { slug: "fuite-toiture-urgence", content: getRoofLeakEmergencyGuide, category: { fr: "Urgences", en: "Emergency" } },
  { slug: "signes-toiture-endommagee", content: getDamagedRoofSignsGuide, category: { fr: "Diagnostic", en: "Diagnostic" } },
  { slug: "reclamation-assurance-toiture", content: getInsuranceClaimGuide, category: { fr: "Assurance", en: "Insurance" } },
  { slug: "inspection-toiture", content: getRoofInspectionGuide, category: { fr: "Inspection", en: "Inspection" } },
  { slug: "bardeaux-vs-tole", content: getShinglesVsMetalGuide, category: { fr: "Matériaux", en: "Materials" } },
  { slug: "garantie-toiture", content: getRoofWarrantyGuide, category: { fr: "Garanties", en: "Warranties" } },
  { slug: "toiture-commerciale", content: getCommercialRoofingGuide, category: { fr: "Commercial", en: "Commercial" } },
  { slug: "ventilation-entretoit", content: getAtticVentilationGuide, category: { fr: "Ventilation", en: "Ventilation" } },
  { slug: "toiture-hiver-quebec", content: getRoofWinterQuebecGuide, category: { fr: "Hiver", en: "Winter" } },
  { slug: "gouttieres-toiture", content: getGuttersGuide, category: { fr: "Gouttières", en: "Gutters" } },
];

const COPY = {
  fr: {
    title: "Tous nos guides toiture pour propriétaires à Gatineau",
    metaDescription: "10 guides pratiques pour propriétaires à Gatineau et dans l'Outaouais — réparations, urgences, inspections, matériaux, hiver, assurance et plus.",
    h1: "Guides toiture pour propriétaires à Gatineau",
    intro: "Tout ce qu'on aurait voulu nous expliquer avant qu'on ait des problèmes de toiture — réuni en un seul endroit. Chaque guide est écrit par notre équipe, basé sur ce qu'on voit chaque semaine dans la région de l'Outaouais.",
    cta: "Une question qui n'est pas couverte ici? Demandez une soumission ou une inspection — gratuite, sans engagement.",
    readGuide: "Lire le guide",
  },
  en: {
    title: "All Our Roofing Guides for Gatineau Homeowners",
    metaDescription: "10 practical guides for homeowners in Gatineau and the Outaouais — repairs, emergencies, inspections, materials, winter, insurance and more.",
    h1: "Roofing Guides for Gatineau Homeowners",
    intro: "Everything we wish someone had told us before we had roofing problems — gathered in one place. Each guide is written by our team, based on what we see weekly in the Outaouais region.",
    cta: "Question not covered here? Request a quote or inspection — free, no obligation.",
    readGuide: "Read the guide",
  },
};

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const c = COPY[validated];
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${validated}/guides`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/guides`])),
    },
  };
}

export default async function GuidesHubPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = COPY[validated];
  const sc = siteConfig[validated]!;
  const tt = t(validated);
  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/guides`;

  // CollectionPage + ItemList JSON-LD: tells Google this is a curated
  // hub of related articles, not a duplicate of the homepage Guides
  // section. Each item is positioned for ranking signal.
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.h1,
    description: c.metaDescription,
    inLanguage: validated === "fr" ? "fr-CA" : "en-CA",
    url: `https://${siteConfig.domain}/${validated}/guides`,
    isPartOf: { "@type": "WebSite", name: sc.brandName, url: `https://${siteConfig.domain}` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => {
        const item = g.content(validated);
        return {
          "@type": "ListItem",
          position: i + 1,
          url: `https://${siteConfig.domain}/${validated}/${g.slug}`,
          name: item.title,
        };
      }),
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: sc.brandName, item: `https://${siteConfig.domain}/${validated}` },
      { "@type": "ListItem", position: 2, name: c.h1, item: `https://${siteConfig.domain}/${validated}/guides` },
    ],
  };

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="pt-12 md:pt-16 pb-6">
          <div className="mx-auto max-w-3xl px-6">
            <nav className="text-sm text-[#5a5a5a] mb-4">
              <Link href={`/${validated}`} className="hover:underline">{sc.brandName}</Link>
              <span className="mx-2">/</span>
              <span>{c.h1}</span>
            </nav>
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-4">{c.h1}</h1>
            <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed">{c.intro}</p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-6xl px-6">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GUIDES.map(g => {
                const item = g.content(validated);
                return (
                  <li key={g.slug}>
                    <Link
                      href={`/${validated}/${g.slug}`}
                      className="block h-full bg-white rounded-md p-6 border border-[#ededed] hover:border-[#16a34a] hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs uppercase tracking-wide text-[#16a34a] font-semibold mb-2">
                        {g.category[validated]}
                      </p>
                      <h2 className="font-display text-lg md:text-xl mb-2 leading-snug text-[#0a0a0a]">
                        {item.title}
                      </h2>
                      <p className="text-sm text-[#5a5a5a] leading-relaxed mb-3">{item.metaDescription}</p>
                      <span className="text-xs uppercase tracking-wide font-semibold text-[#16a34a]">
                        {c.readGuide} →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#fafafa]">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed">{c.cta}</p>
            <p className="mt-4 text-sm text-[#5a5a5a]">
              <Link href={`/${validated}/services`} className="text-[#16a34a] font-semibold hover:underline">{tt.services}</Link>
              <span className="mx-3 text-[#b8b8b8]">·</span>
              <Link href={`/${validated}/locations`} className="text-[#5a5a5a] hover:underline">{tt.locations}</Link>
              <span className="mx-3 text-[#b8b8b8]">·</span>
              <Link href={`/${validated}/faq`} className="text-[#5a5a5a] hover:underline">{tt.faq}</Link>
            </p>
          </div>
        </section>

        <PageCTA lang={validated} />
      </main>
      <Footer lang={validated} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
