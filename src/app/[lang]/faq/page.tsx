import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { getFaq } from "@/lib/faq";
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
    title: `${tt.faq} — ${c.brandName}`,
    description: tt.faqIntro,
    alternates: {
      canonical: `/${validated}/faq`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/faq`])),
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = siteConfig[validated]!;
  const tt = t(validated);
  const faq = getFaq(validated);

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/faq`;

  // FAQPage JSON-LD — produces a rich snippet (collapsible Q&A) in Google
  // SERP when the page ranks. https://developers.google.com/search/docs/appearance/structured-data/faqpage
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="pt-12 md:pt-16 pb-6">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-3">{tt.faq}</h1>
            <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed">
              {tt.faqIntro}
            </p>
            <p className="text-[#5a5a5a] text-sm mt-2">
              {c.brandName} · {siteConfig.city}, {siteConfig.state}
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-3xl px-6 space-y-6">
            {faq.map((entry, i) => (
              <details
                key={i}
                className="group border border-[#e6e6e6] rounded-md p-5 open:bg-[#fafafa]"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <h2 className="font-semibold text-lg md:text-xl text-[#0a0a0a] leading-snug">
                    {entry.q}
                  </h2>
                  <span className="text-2xl text-[#16a34a] font-light leading-none mt-1 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#1a1a1a] leading-relaxed text-base whitespace-pre-line">
                  {entry.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <PageCTA lang={validated} />
      </main>
      <Footer lang={validated} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
