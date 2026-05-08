import Link from "next/link";
import { siteConfig, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
}

export function Footer({ lang }: Props) {
  const c = siteConfig[lang]!;
  const tt = t(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#fafafa] border-t border-[#e6e6e6]">
      <div className="mx-auto max-w-6xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Link href={`/${lang}`} className="font-display text-2xl mb-4 hover:underline block">{tt.home}</Link>
          <a href={`tel:${siteConfig.phone}`} className="phone-chrome text-base">
            {siteConfig.phoneDisplay}
          </a>
        </div>

        <div>
          <div className="font-display text-2xl mb-4">{tt.services}</div>
          <ul className="text-sm text-[#1a1a1a] space-y-2">
            {c.services.map(s => (
              <li key={s.slug}>
                <Link href={`/${lang}/${s.slug}`} className="hover:underline">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-2xl mb-4">{tt.about}</div>
          <div className="font-semibold mb-2">{c.brandName}</div>
          <Link href={`/${lang}/about`} className="block text-sm hover:underline mb-2">{tt.aboutTitle}</Link>
          <Link href={`/${lang}/contact`} className="block text-sm hover:underline mb-2">{tt.contact}</Link>
          <a href={`tel:${siteConfig.phone}`} className="block text-sm hover:underline">{siteConfig.phoneDisplay}</a>
        </div>

        <div>
          <div className="font-display text-2xl mb-4">{tt.contact}</div>
          <a href={`mailto:${siteConfig.email}`} className="block text-sm hover:underline mb-2 break-all">{siteConfig.email}</a>
          <div className="text-sm text-[#5a5a5a]">{siteConfig.city}, {siteConfig.state}</div>
        </div>
      </div>
      <div className="border-t border-[#e6e6e6] py-5 text-center text-xs text-[#7a7a7a]">
        © {year} {c.brandName}. {tt.rightsReserved}.{" "}
        <Link href={`/${lang}/privacy-policy`} target="_blank" rel="noopener" className="hover:underline">{tt.privacyPolicy}</Link>
        {" | "}
        <Link href={`/${lang}/terms-of-use`} target="_blank" rel="noopener" className="hover:underline">{tt.termsOfUse}</Link>
      </div>
    </footer>
  );
}
