import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { availableLangs, type Lang } from "@/lib/site.config";
import { getInsuranceClaimGuide } from "@/lib/long-tail-content";
import { LongFormPage } from "@/components/LongFormPage";

interface Props {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const c = getInsuranceClaimGuide(validated);
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${validated}/reclamation-assurance-toiture`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/reclamation-assurance-toiture`])),
    },
  };
}

export default async function InsuranceClaimPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/reclamation-assurance-toiture`;
  return (
    <LongFormPage
      lang={validated}
      slug="reclamation-assurance-toiture"
      content={getInsuranceClaimGuide(validated)}
      altPath={altPath}
    />
  );
}
