import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
}

export function PageCTA({ lang }: Props) {
  const tt = t(lang);
  return (
    <section className="bg-[#fafafa] border-y border-[#e6e6e6] py-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-lg text-[#1a1a1a] mb-6">{tt.contactSubtitle}</p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-block bg-black hover:bg-[#1a1a1a] text-white uppercase tracking-wide font-semibold px-10 py-4 rounded transition"
        >
          {siteConfig.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
