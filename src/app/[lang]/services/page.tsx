import type { Metadata } from "next";
import Image from "next/image";
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
  const title = `${tt.ourServices} ${siteConfig.city} — ${c.brandName}`;
  return {
    title,
    description: c.servicesIntro || c.seoDescription,
    alternates: {
      canonical: `/${validated}/services`,
      languages: Object.fromEntries(availableLangs().map(l => [l, `/${l}/services`])),
    },
  };
}

export default async function ServicesIndexPage({ params }: Props) {
  const { lang } = await params;
  const validated = resolveLang(lang);
  if (!validated) notFound();
  const c = siteConfig[validated]!;
  const tt = t(validated);

  const altPath: Partial<Record<Lang, string>> = {};
  for (const l of availableLangs()) altPath[l] = `/${l}/services`;

  return (
    <>
      <Header lang={validated} altPath={altPath} />
      <main className="bg-white">
        <section className="pt-12 md:pt-16 pb-6">
          <div className="mx-auto max-w-5xl px-6">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-3">
              {tt.ourServices} {siteConfig.city}
            </h1>
            {c.servicesIntro && (
              <p className="text-[#1a1a1a] text-base md:text-lg leading-relaxed max-w-3xl">
                {c.servicesIntro}
              </p>
            )}
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-2 gap-8 md:gap-10">
            {c.services.map((svc, i) => {
              const image = siteConfig.serviceImages[i];
              return (
                <article key={svc.slug} className="flex flex-col">
                  <Link href={`/${validated}/${svc.slug}`} className="block group">
                    {image ? (
                      <Image
                        src={image}
                        alt={svc.title}
                        width={1254}
                        height={1254}
                        sizes="(min-width: 768px) 480px, 100vw"
                        className="w-full aspect-[4/3] object-cover rounded-md mb-4 group-hover:opacity-90 transition"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] rounded-md bg-[#f0f0f0] mb-4" />
                    )}
                  </Link>
                  <h2 className="font-display text-xl md:text-2xl mb-2 leading-tight">
                    <Link
                      href={`/${validated}/${svc.slug}`}
                      className="hover:underline decoration-2 underline-offset-4"
                    >
                      {svc.title}
                    </Link>
                  </h2>
                  <p className="text-[#1a1a1a] leading-relaxed text-sm md:text-base mb-3">
                    {svc.description}
                  </p>
                  <Link
                    href={`/${validated}/${svc.slug}`}
                    className="inline-block text-xs md:text-sm uppercase tracking-wide font-semibold border-b-2 border-black pb-0.5 self-start hover:text-[#16a34a] hover:border-[#16a34a]"
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
