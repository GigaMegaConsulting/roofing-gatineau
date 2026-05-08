import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLang, langStaticParams } from "@/lib/lang";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

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
    title: `${tt.contactHeadline} — ${c.brandName}`,
    description: c.seoDescription,
    alternates: {
      canonical: `/${validated}/contact`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/contact`])),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const tt = t(validated);

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/contact`;

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-3 text-center">{tt.contactHeadline}</h1>
            <p className="text-center text-[#5a5a5a] mb-10">{tt.contactPageIntro}</p>

            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-between gap-4 bg-black hover:bg-[#1a1a1a] text-white font-semibold p-5 rounded-md transition mb-8"
            >
              <span className="text-lg md:text-xl">{siteConfig.phoneDisplay}</span>
              <span className="text-sm opacity-90">{tt.callNow} →</span>
            </a>

            <ContactForm lang={validated} />

            <div className="mt-10 text-center text-sm text-[#5a5a5a]">
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
              </p>
              <p className="mt-1">{siteConfig.city}, {siteConfig.state}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={validated} />
    </>
  );
}
