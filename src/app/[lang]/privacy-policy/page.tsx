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
    title: `${tt.privacyPolicy} | ${c.brandName}`,
    description: `${tt.privacyPolicy} — ${c.brandName}.`,
    alternates: {
      canonical: `/${validated}/privacy-policy`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/privacy-policy`])),
    },
  };
}

const COPY = {
  fr: {
    intro: "Cette politique de confidentialité décrit nos politiques et procédures concernant la collecte, l'utilisation et la divulgation de vos informations lorsque vous utilisez le service.",
    sectionData: "Données personnelles collectées",
    sectionUse: "Utilisation de vos données",
    sectionShare: "Partage de vos données",
    sectionRetain: "Conservation",
    sectionSecurity: "Sécurité",
    sectionLinks: "Liens vers d'autres sites",
    sectionChanges: "Modifications de cette politique",
    sectionContact: "Nous contacter",
    contactByEmail: "Par courriel :",
    p1: (brand: string, addr: string, country: string, url: string) =>
      <>Aux fins de la présente politique, <em>la Société</em> (« nous », « notre ») désigne <strong>{brand}</strong>, {addr}. <em>Pays</em> : {country}. <em>Site Web</em> : <a href={url} className="underline">{url}</a>.</>,
    list1: ["Adresse courriel", "Prénom et nom", "Numéro de téléphone", "Adresse, ville, province, code postal", "Données d'utilisation"],
    p2: "Nous utilisons les données personnelles pour fournir et maintenir le service, gérer vos demandes, vous contacter, et améliorer notre service.",
    p3: "Nous pouvons partager vos informations avec des fournisseurs de services, lors de transferts d'entreprise, avec des affiliés, ou avec votre consentement.",
    p4: "Nous conservons vos données personnelles seulement aussi longtemps que nécessaire aux fins énoncées.",
    p5: "La sécurité de vos données est importante pour nous, mais aucune méthode de transmission par Internet n'est 100 % sécurisée.",
    p6: "Notre service peut contenir des liens vers d'autres sites. Nous vous conseillons fortement de consulter leur politique de confidentialité.",
    p7: "Nous pouvons mettre à jour cette politique périodiquement. Les changements prennent effet dès leur publication.",
  },
  en: {
    intro: "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service.",
    sectionData: "Personal data we collect",
    sectionUse: "Use of your data",
    sectionShare: "Sharing your data",
    sectionRetain: "Retention",
    sectionSecurity: "Security",
    sectionLinks: "Links to other websites",
    sectionChanges: "Changes to this policy",
    sectionContact: "Contact us",
    contactByEmail: "By email:",
    p1: (brand: string, addr: string, country: string, url: string) =>
      <>For the purposes of this Privacy Policy: <em>Company</em> (&ldquo;We&rdquo;, &ldquo;Our&rdquo;) refers to <strong>{brand}</strong>, {addr}. <em>Country</em>: {country}. <em>Website</em>: <a href={url} className="underline">{url}</a>.</>,
    list1: ["Email address", "First and last name", "Phone number", "Address, city, province, postal code", "Usage data"],
    p2: "We use Personal Data to provide and maintain the Service, manage Your requests, contact You, and improve the Service.",
    p3: "We may share your information with Service Providers, in business transfers, with affiliates, or with your consent.",
    p4: "We retain Your Personal Data only as long as necessary for the purposes set out.",
    p5: "The security of Your Personal Data is important to Us, but no method of Internet transmission is 100% secure.",
    p6: "Our Service may contain links to other websites. We strongly advise You to review their privacy policy.",
    p7: "We may update Our Privacy Policy from time to time. Changes are effective when posted on this page.",
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
  for (const l of availableLangs()) altPath[l] = `/${l}/privacy-policy`;

  return (
    <LegalLayout lang={validated} altPath={altPath} title={tt.privacyPolicy} lastUpdated={today()}>
      <p className="mb-4">{copy.intro}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">Interpretation</h2>
      <p className="mb-4">{copy.p1(ctx.brand, ctx.address, ctx.country, ctx.url)}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionData}</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        {copy.list1.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionUse}</h2>
      <p className="mb-4">{copy.p2}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionShare}</h2>
      <p className="mb-4">{copy.p3}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionRetain}</h2>
      <p className="mb-4">{copy.p4}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionSecurity}</h2>
      <p className="mb-4">{copy.p5}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionLinks}</h2>
      <p className="mb-4">{copy.p6}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{copy.sectionChanges}</h2>
      <p className="mb-4">{copy.p7}</p>

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
