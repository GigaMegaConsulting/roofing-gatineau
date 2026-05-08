import Link from "next/link";
import type { LongFormContent } from "@/lib/long-tail-content";
import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageCTA } from "@/components/PageCTA";

interface Props {
  lang: Lang;
  slug: string;
  content: LongFormContent;
  altPath?: Partial<Record<Lang, string>>;
}

export function LongFormPage({ lang, slug, content, altPath }: Props) {
  const c = siteConfig[lang]!;
  const tt = t(lang);

  // Article + BreadcrumbList JSON-LD for rich result eligibility.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
    url: `https://${siteConfig.domain}/${lang}/${slug}`,
    publisher: {
      "@type": "LocalBusiness",
      name: c.brandName,
      url: `https://${siteConfig.domain}`,
    },
    mainEntityOfPage: `https://${siteConfig.domain}/${lang}/${slug}`,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.brandName, item: `https://${siteConfig.domain}/${lang}` },
      { "@type": "ListItem", position: 2, name: tt.faq, item: `https://${siteConfig.domain}/${lang}/faq` },
      { "@type": "ListItem", position: 3, name: content.title, item: `https://${siteConfig.domain}/${lang}/${slug}` },
    ],
  };

  return (
    <>
      <Header lang={lang} altPath={altPath} />
      <main className="bg-white">
        <article>
          <section className="pt-12 md:pt-16 pb-6">
            <div className="mx-auto max-w-3xl px-6">
              <nav className="text-sm text-[#5a5a5a] mb-4">
                <Link href={`/${lang}`} className="hover:underline">{c.brandName}</Link>
                <span className="mx-2">/</span>
                <span>{content.title}</span>
              </nav>
              <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-4">{content.title}</h1>
              <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed">{content.intro}</p>
            </div>
          </section>

          {content.sections.map((sec, i) => (
            <section key={i} className={i % 2 === 0 ? "py-8 md:py-12" : "py-8 md:py-12 bg-[#fafafa]"}>
              <div className="mx-auto max-w-3xl px-6">
                <h2 className="font-display text-2xl md:text-3xl mb-4">{sec.heading}</h2>
                <div className="space-y-4 text-[#1a1a1a] leading-relaxed text-base md:text-lg">
                  {sec.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </div>
            </section>
          ))}

          <section className="py-8 md:py-12">
            <div className="mx-auto max-w-3xl px-6">
              <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed">{content.closing}</p>
              <p className="mt-6 text-sm text-[#5a5a5a]">
                <Link href={`/${lang}/faq`} className="hover:underline text-[#16a34a]">{tt.faq}</Link>
                <span className="mx-2">·</span>
                <Link href={`/${lang}/services`} className="hover:underline text-[#16a34a]">{tt.services}</Link>
                <span className="mx-2">·</span>
                <Link href={`/${lang}/locations`} className="hover:underline text-[#16a34a]">{tt.locations}</Link>
              </p>
            </div>
          </section>
        </article>

        <PageCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
