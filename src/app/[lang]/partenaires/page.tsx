import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageCTA } from "@/components/PageCTA";

interface Props {
  params: Promise<{ lang: string }>;
}

// Partners / referral page. Lives at /[lang]/partenaires on both langs so
// the outreach email has a real URL to point to ("I'll add you to our
// partners page"). Each entry is a manual addition: when a contractor
// agrees to cross-link, append them to PARTNERS below and they appear on
// both /fr/partenaires and /en/partenaires.
//
// Outreach playbook + email templates live in:
//   mission-control/data/lead-landlord/seo-audit-2026-05-11.md

export function generateStaticParams() {
  return langStaticParams();
}

// To add a partner: paste a new object inside the array. Both langs read
// the same list; the `description.fr` / `description.en` fields let you
// localize the one-liner.
interface Partner {
  name: string;
  url: string;
  niche: { fr: string; en: string };
  description: { fr: string; en: string };
}

const PARTNERS: Partner[] = [
  // Example (kept commented so the page renders cleanly until first real partner signs):
  // {
  //   name: "Plomberie Exemple",
  //   url: "https://plomberieexemple.ca",
  //   niche: { fr: "Plomberie résidentielle", en: "Residential plumbing" },
  //   description: {
  //     fr: "Équipe locale spécialisée dans les urgences plomberie à Gatineau et Aylmer.",
  //     en: "Local team specialized in plumbing emergencies in Gatineau and Aylmer.",
  //   },
  // },
];

const COPY = {
  fr: {
    title: "Partenaires recommandés à Gatineau",
    metaDescription: "Liste des entrepreneurs et services partenaires que nous recommandons à nos clients à Gatineau et dans l'Outaouais.",
    h1: "Partenaires recommandés",
    intro: "Quand un client a besoin d'un service qui sort de notre expertise — plomberie, électricité, déménagement, paysagement, rénovation générale — on préfère le diriger vers une équipe locale qu'on connaît. Voici les entreprises avec qui on collabore régulièrement à Gatineau et dans l'Outaouais.",
    addedNote: "Vous êtes une entreprise de la région et vous aimeriez figurer ici? Envoyez-nous un courriel via notre page contact — on ajoute les entreprises qui partagent nos valeurs (transparence, réponses rapides, travail bien fait) et avec qui un échange de référencement fait du sens.",
    emptyState: "Notre liste de partenaires est en construction. Si vous êtes un entrepreneur local à Gatineau et que vous voulez collaborer, contactez-nous.",
    visit: "Visiter le site",
    contactLink: "Nous joindre",
  },
  en: {
    title: "Recommended Partners in Gatineau",
    metaDescription: "List of contractors and partner services we recommend to our clients in Gatineau and the Outaouais region.",
    h1: "Recommended Partners",
    intro: "When a client needs a service outside our expertise — plumbing, electrical, moving, landscaping, general renovation — we'd rather refer them to a local team we know. Here are the businesses we work with regularly in Gatineau and the Outaouais.",
    addedNote: "Are you a local business that would like to be listed here? Reach out via our contact page — we add businesses that share our values (transparency, fast replies, quality work) and where a referral exchange makes sense.",
    emptyState: "Our partner list is being built. If you're a local Gatineau contractor and want to collaborate, get in touch.",
    visit: "Visit website",
    contactLink: "Contact us",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const c = COPY[validated];
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${validated}/partenaires`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/partenaires`])),
    },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = COPY[validated];
  const sc = siteConfig[validated]!;
  const tt = t(validated);
  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/partenaires`;

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
          <div className="mx-auto max-w-3xl px-6">
            {PARTNERS.length === 0 ? (
              <p className="text-[#5a5a5a] italic">{c.emptyState}</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-5">
                {PARTNERS.map(p => (
                  <li key={p.url} className="bg-white rounded-md p-6 border border-[#ededed]">
                    <h3 className="font-display text-lg md:text-xl mb-1 text-[#0a0a0a]">{p.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-[#5a5a5a] mb-2">{p.niche[validated]}</p>
                    <p className="text-sm text-[#1a1a1a] leading-relaxed mb-3">{p.description[validated]}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-block text-xs uppercase tracking-wide font-semibold text-[#16a34a] hover:underline"
                    >
                      {c.visit} →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#fafafa]">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[#1a1a1a] text-base leading-relaxed">{c.addedNote}</p>
            <p className="mt-4">
              <Link href={`/${validated}/contact`} className="text-[#16a34a] font-semibold hover:underline">
                {c.contactLink} →
              </Link>
              <span className="mx-3 text-[#b8b8b8]">·</span>
              <Link href={`/${validated}`} className="text-[#5a5a5a] hover:underline">
                {tt.home}
              </Link>
            </p>
          </div>
        </section>

        <PageCTA lang={validated} />
      </main>
      <Footer lang={validated} />
    </>
  );
}
