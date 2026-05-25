import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { availableLangs, type Lang } from "@/lib/site.config";
import { getRoofWinterQuebecGuide } from "@/lib/long-tail-content";
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
  const c = getRoofWinterQuebecGuide(validated);
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${validated}/toiture-hiver-quebec`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/toiture-hiver-quebec`])),
    },
  };
}

export default async function RoofWinterQuebecPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/toiture-hiver-quebec`;
  return (
    <LongFormPage
      lang={validated}
      slug="toiture-hiver-quebec"
      content={getRoofWinterQuebecGuide(validated)}
      altPath={altPath}
    />
  );
}
