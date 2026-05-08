import Image from "next/image";
import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";
import { QuoteForm } from "@/components/QuoteForm";

interface Props {
  lang: Lang;
}

export function Hero({ lang }: Props) {
  const c = siteConfig[lang]!;
  const tt = t(lang);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h1 className="text-center font-bold text-[40px] md:text-[64px] leading-[1.05] tracking-tight max-w-4xl mx-auto mb-12">
          {c.heroHeadline}
        </h1>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div>
            {siteConfig.heroImage ? (
              <Image
                src={siteConfig.heroImage}
                alt={`${siteConfig.niche} ${siteConfig.city}`}
                width={1536}
                height={1024}
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1024px) 600px, 100vw"
                className="w-full h-auto aspect-[4/3] object-cover rounded-md"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-md bg-[#f0f0f0]" />
            )}
          </div>

          <div>
            <div className="mb-6 inline-block">
              <div className="bg-[#16a34a] text-white px-6 py-3 rounded-l-2xl rounded-tr-2xl font-bold tracking-wide text-base md:text-lg">
                {tt.freeInstantQuote}
              </div>
              <div className="text-[#16a34a] font-semibold text-sm mt-1 ml-2">
                {tt.enterInfoBelow} ⬇
              </div>
            </div>

            <QuoteForm lang={lang} source="hero" variant="stacked" />
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={`tel:${siteConfig.phone}`}
            className="bg-black hover:bg-[#1a1a1a] text-white uppercase tracking-wide font-semibold px-10 py-4 rounded transition shadow-lg shadow-black/20"
          >
            {tt.callNowFor}
          </a>
        </div>
      </div>
    </section>
  );
}
