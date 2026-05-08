import Image from "next/image";
import Link from "next/link";
import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
}

export function Services({ lang }: Props) {
  const c = siteConfig[lang]!;
  const tt = t(lang);

  return (
    <section id="services" className="bg-white pt-4 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 flex flex-col gap-16 md:gap-24">
        {c.services.map((svc, i) => {
          const imageOnLeft = i % 2 === 0;
          const image = siteConfig.serviceImages[i];
          return (
            <div key={svc.slug} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
              <div className={imageOnLeft ? "md:order-1" : "md:order-2"}>
                {image ? (
                  <Image
                    src={image}
                    alt={svc.title}
                    width={1254}
                    height={1254}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full aspect-[4/3] object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-md bg-[#f0f0f0]" />
                )}
              </div>
              <div className={imageOnLeft ? "md:order-2" : "md:order-1"}>
                <h2 className="font-display text-2xl md:text-4xl mb-4 leading-tight">
                  <Link href={`/${lang}/${svc.slug}`} className="hover:underline decoration-2 underline-offset-4">
                    {svc.title}
                  </Link>
                </h2>
                <p className="text-[#1a1a1a] leading-relaxed text-base md:text-lg mb-4">
                  {svc.description}
                </p>
                <Link
                  href={`/${lang}/${svc.slug}`}
                  className="inline-block text-sm uppercase tracking-wide font-semibold border-b-2 border-black pb-0.5 hover:text-[#16a34a] hover:border-[#16a34a]"
                >
                  {tt.learnMore} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
