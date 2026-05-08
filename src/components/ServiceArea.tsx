import Link from "next/link";
import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
}

export function ServiceArea({ lang }: Props) {
  const c = siteConfig[lang]!;
  const tt = t(lang);

  const items = c.locations.map((loc, i) => ({ slug: loc.slug, name: siteConfig.locationNames[i] }));
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const mapQuery = encodeURIComponent(`${siteConfig.city}, ${siteConfig.state}, Canada`);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="service-area" className="bg-[#fafafa] py-16 md:py-20 border-t border-[#e6e6e6]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-center text-3xl md:text-5xl mb-12">
          {siteConfig.city} {c.serviceAreaHeading ?? tt.serviceArea}
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="aspect-[4/3] rounded-md overflow-hidden border border-[#e6e6e6]">
            <iframe
              title={`${siteConfig.city} map`}
              src={mapSrc}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
            {left.map(it => (
              <li key={it.slug}>
                <Link href={`/${lang}/${it.slug}`} className="underline decoration-[#e6e6e6] hover:decoration-black">
                  {it.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
            {right.map(it => (
              <li key={it.slug}>
                <Link href={`/${lang}/${it.slug}`} className="underline decoration-[#e6e6e6] hover:decoration-black">
                  {it.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
