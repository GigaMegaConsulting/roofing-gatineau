import type { Metadata } from "next";
import Link from "next/link";
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
  const title = `${tt.ourServiceAreas} — ${c.brandName}`;
  return {
    title,
    description: c.serviceAreaHeading || c.seoDescription,
    alternates: {
      canonical: `/${validated}/locations`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/locations`])),
    },
  };
}

// Pull a short blurb from the per-location pageContent: first 1–2 sentences,
// capped to ~200 chars so the cards stay even. Prefers a sentence boundary
// (no trailing ellipsis when we land on a period); otherwise hard-cuts and
// appends a single ellipsis character.
function blurb(content: string): string {
  const firstPara = content.split(/\n\n+/)[0]?.trim() || "";
  if (firstPara.length <= 200) return firstPara;
  const trimmed = firstPara.slice(0, 200);
  const lastDot = trimmed.lastIndexOf(". ");
  if (lastDot > 80) return trimmed.slice(0, lastDot + 1);
  return trimmed.replace(/[.,;:\s]+$/, "") + "…";
}

export default async function LocationsIndexPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = siteConfig[validated]!;
  const tt = t(validated);

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/locations`;

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="pt-12 md:pt-16 pb-6">
          <div className="mx-auto max-w-5xl px-6">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-3">
              {tt.ourServiceAreas}
            </h1>
            {c.serviceAreaHeading && (
              <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed max-w-3xl">
                {c.serviceAreaHeading} — {siteConfig.city}, {siteConfig.state}.
              </p>
            )}
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {c.locations.map((loc, i) => {
              const name = siteConfig.locationNames[i];
              return (
                <article
                  key={loc.slug}
                  className="border border-[#e6e6e6] rounded-md p-5 flex flex-col hover:border-[#1a1a1a] transition"
                >
                  <h2 className="font-display text-lg md:text-xl mb-2 leading-tight">
                    <Link
                      href={`/${validated}/${loc.slug}`}
                      className="hover:underline decoration-2 underline-offset-4"
                    >
                      {name}
                    </Link>
                  </h2>
                  <p className="text-[#1a1a1a] leading-relaxed text-sm mb-4 flex-1">
                    {blurb(loc.pageContent)}
                  </p>
                  <Link
                    href={`/${validated}/${loc.slug}`}
                    className="inline-block text-xs uppercase tracking-wide font-semibold border-b-2 border-black pb-0.5 self-start hover:text-[#16a34a] hover:border-[#16a34a]"
                  >
                    {tt.learnMore} →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <PageCTA lang={validated} />
      </main>
      <Footer lang={validated} />
    </>
  );
}
