import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs } from "@/lib/site.config";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ServiceArea } from "@/components/ServiceArea";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

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
  const c = siteConfig[validated]!;
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: {
      canonical: `/${validated}`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}`])),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const altPath: Partial<Record<"fr" | "en", string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}`;

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main>
        <Hero lang={validated} />
        <Services lang={validated} />
        <ServiceArea lang={validated} />
        <Testimonials lang={validated} />
      </main>
      <Footer lang={validated} />
    </>
  );
}
