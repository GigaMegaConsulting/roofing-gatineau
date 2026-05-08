import type { Metadata } from "next";
import Image from "next/image";
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

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) return {};
  const c = siteConfig[validated]!;
  const tt = t(validated);
  return {
    title: `${tt.aboutTitle} — ${c.brandName}`,
    description: c.seoDescription,
    alternates: {
      canonical: `/${validated}/about`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/about`])),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = siteConfig[validated]!;
  const tt = t(validated);

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/about`;

  const paragraphs = c.aboutPageContent.split(/\n\n+/).map(p => p.trim()).filter(Boolean);

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="pt-12 md:pt-16 pb-8">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-2">{tt.aboutTitle}</h1>
            <p className="text-[#5a5a5a]">{c.tagline}</p>
          </div>
        </section>

        {siteConfig.heroImage && (
          <section>
            <div className="mx-auto max-w-3xl px-6">
              <Image
                src={siteConfig.heroImage}
                alt={c.brandName}
                width={1536}
                height={1024}
                sizes="(min-width: 768px) 720px, 100vw"
                className="w-full aspect-[16/9] object-cover rounded-md"
              />
            </div>
          </section>
        )}

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6 text-[#1a1a1a] leading-relaxed text-base md:text-lg space-y-5">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        <PageCTA lang={validated} />
      </main>
      <Footer lang={validated} />
    </>
  );
}
