import Link from "next/link";
import { type Lang } from "@/lib/site.config";
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
} from "@/lib/long-tail-content";

interface Props {
  lang: Lang;
}

// Surfaces the 6 long-tail guides on the homepage so Google sees them
// through the link graph (not just the sitemap) and visitors can browse
// the high-intent informational content without hunting for it.
//
// Order matters: emergency / decision-making content first (highest intent),
// preventive content last.
export function Guides({ lang }: Props) {
  const heading =
    lang === "fr"
      ? "Guides pour propriétaires à Gatineau"
      : "Guides for Gatineau homeowners";
  const sub =
    lang === "fr"
      ? "Réponses claires aux questions qu'on nous pose le plus souvent — sans jargon, sans promesses irréalistes."
      : "Clear answers to the questions we get asked most often — no jargon, no oversold promises.";

  // Ordered by intent: emergency/decision-making first, preventive & technical last.
  const items = [
    { slug: "fuite-toiture-urgence", content: getRoofLeakEmergencyGuide(lang) },
    { slug: "signes-toiture-endommagee", content: getDamagedRoofSignsGuide(lang) },
    { slug: "reclamation-assurance-toiture", content: getInsuranceClaimGuide(lang) },
    { slug: "inspection-toiture", content: getRoofInspectionGuide(lang) },
    { slug: "bardeaux-vs-tole", content: getShinglesVsMetalGuide(lang) },
    { slug: "toiture-commerciale", content: getCommercialRoofingGuide(lang) },
    { slug: "ventilation-entretoit", content: getAtticVentilationGuide(lang) },
    { slug: "garantie-toiture", content: getRoofWarrantyGuide(lang) },
    { slug: "toiture-hiver-quebec", content: getRoofWinterQuebecGuide(lang) },
    { slug: "gouttieres-toiture", content: getGuttersGuide(lang) },
  ];

  return (
    <section id="guides" className="bg-[#fafafa] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-4xl mb-3 leading-tight">{heading}</h2>
        <p className="text-[#1a1a1a] text-base md:text-lg mb-10 max-w-3xl leading-relaxed">{sub}</p>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <li key={item.slug}>
              <Link
                href={`/${lang}/${item.slug}`}
                className="block h-full bg-white rounded-md p-6 hover:shadow-md hover:bg-white transition-shadow border border-[#ededed] hover:border-[#16a34a]"
              >
                <h3 className="font-display text-lg md:text-xl mb-2 leading-snug text-[#0a0a0a]">
                  {item.content.title}
                </h3>
                <p className="text-sm text-[#5a5a5a] leading-relaxed">{item.content.metaDescription}</p>
                <span className="mt-3 inline-block text-xs uppercase tracking-wide font-semibold text-[#16a34a]">
                  {lang === "fr" ? "Lire le guide" : "Read the guide"} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
