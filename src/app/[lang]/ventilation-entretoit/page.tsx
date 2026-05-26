import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { availableLangs, type Lang } from "@/lib/site.config";
import { getAtticVentilationGuide } from "@/lib/long-tail-content";
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
  const c = getAtticVentilationGuide(validated);
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${validated}/ventilation-entretoit`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/ventilation-entretoit`])),
    },
  };
}

export default async function AtticVentilationPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/ventilation-entretoit`;
  return (
    <LongFormPage
      lang={validated}
      slug="ventilation-entretoit"
      content={getAtticVentilationGuide(validated)}
      altPath={altPath}
    />
  );
}
