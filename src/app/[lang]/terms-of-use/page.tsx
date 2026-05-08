import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { LegalLayout } from "@/components/LegalLayout";
import { legalContext } from "@/lib/legal-strings";

interface Props { params: Promise<{ lang: string }>; }

export function generateStaticParams() { return langStaticParams(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const tt = t(validated);
  const c = siteConfig[validated]!;
  return {
    title: `${tt.termsOfUse} | ${c.brandName}`,
    description: `${tt.termsOfUse} — ${c.brandName}.`,
    alternates: {
      canonical: `/${validated}/terms-of-use`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/terms-of-use`])),
    },
  };
}

const COPY = {
  fr: {
    intro: "Veuillez lire attentivement ces conditions avant d'utiliser notre service.",
    sectionAcknowledgment: "Reconnaissance",
    sectionLinks: "Liens vers d'autres sites",
    sectionTermination: "Résiliation",
    sectionLiability: "Limitation de responsabilité",
    sectionDisclaimer: "Avis « TEL QUEL »",
    sectionLaw: "Loi applicable",
    sectionDispute: "Résolution des différends",
    sectionChanges: "Modifications",
    sectionContact: "Nous contacter",
    contactByEmail: "Par courriel :",
    p1: (brand: string, addr: string, country: string, url: string) =>
      <>Aux fins des présentes conditions, <em>la Société</em> désigne <strong>{brand}</strong>, {addr}. <em>Pays</em> : {country}. <em>Site Web</em> : <a href={url} className="underline">{url}</a>.</>,
    p2: "Ces conditions régissent l'utilisation du service. Votre accès est conditionnel à votre acceptation. Vous déclarez avoir plus de 18 ans.",
    p3: "Notre service peut contenir des liens vers des sites tiers que nous ne contrôlons pas. Nous ne sommes pas responsables de leur contenu ou pratiques.",
    p4: "Nous pouvons résilier ou suspendre votre accès immédiatement, sans préavis, pour quelque raison que ce soit, y compris une violation de ces conditions.",
    p5: "Notre responsabilité totale est limitée au montant que vous avez payé via le service ou 100 USD si vous n'avez rien acheté.",
    p6: "Le service est fourni « TEL QUEL » sans garantie d'aucune sorte. Nous déclinons toutes les garanties, expresses ou implicites.",
    p7: "Les lois du pays régissent ces conditions, à l'exclusion de leurs règles sur les conflits de lois.",
    p8: "Pour tout litige, vous acceptez d'abord de tenter une résolution informelle en nous contactant.",
    p9: "Nous nous réservons le droit de modifier ces conditions à tout moment. Votre utilisation continue après modification constitue votre acceptation des nouvelles conditions.",
  },
  en: {
    intro: "Please read these terms and conditions carefully before using Our Service.",
    sectionAcknowledgment: "Acknowledgment",
    sectionLinks: "Links to other websites",
    sectionTermination: "Termination",
    sectionLiability: "Limitation of liability",
    sectionDisclaimer: "\"AS IS\" disclaimer",
    sectionLaw: "Governing law",
    sectionDispute: "Disputes resolution",
    sectionChanges: "Changes to these terms",
    sectionContact: "Contact us",
    contactByEmail: "By email:",
    p1: (brand: string, addr: string, country: string, url: string) =>
      <>For the purposes of these Terms: <em>Company</em> refers to <strong>{brand}</strong>, {addr}. <em>Country</em>: {country}. <em>Website</em>: <a href={url} className="underline">{url}</a>.</>,
    p2: "These Terms govern Your use of the Service. Your access is conditional on Your acceptance. You represent You are over the age of 18.",
    p3: "Our Service may contain links to third-party sites we do not control. We are not responsible for their content or practices.",
    p4: "We may terminate or suspend Your access immediately, without prior notice, for any reason including breach of these Terms.",
    p5: "Our entire liability is limited to the amount You actually paid through the Service or USD 100 if You haven't purchased anything.",
    p6: "The Service is provided \"AS IS\" without warranty of any kind. We disclaim all warranties, express or implied.",
    p7: "The laws of the Country govern these Terms, excluding conflicts of law rules.",
    p8: "For any dispute, You agree to first attempt informal resolution by contacting Us.",
    p9: "We reserve the right to modify these Terms at any time. Continued use after changes constitutes Your acceptance of the new terms.",
  },
} as const;

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const tt = t(validated);
  const ctx = legalContext(validated);
  const copy = COPY[validated];

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/terms-of-use`;

  return (
    <LegalLayout lang={validated} altPath={altPath} title={tt.termsOfUse} lastUpdated={today()}>
      <p className="mb-4">{copy.intro}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">Interpretation</h2>
      <p className="mb-4">{copy.p1(ctx.brand, ctx.address, ctx.country, ctx.url)}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionAcknowledgment}</h2>
      <p className="mb-4">{copy.p2}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionLinks}</h2>
      <p className="mb-4">{copy.p3}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionTermination}</h2>
      <p className="mb-4">{copy.p4}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionLiability}</h2>
      <p className="mb-4">{copy.p5}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionDisclaimer}</h2>
      <p className="mb-4">{copy.p6}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionLaw}</h2>
      <p className="mb-4">{copy.p7}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionDispute}</h2>
      <p className="mb-4">{copy.p8}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionChanges}</h2>
      <p className="mb-4">{copy.p9}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionContact}</h2>
      <p className="mb-4">
        {copy.contactByEmail} <a href={`mailto:${ctx.email}`} className="underline">{ctx.email}</a>
      </p>
    </LegalLayout>
  );
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
