import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/site.config";

interface Props {
  lang: Lang;
  altPath?: Partial<Record<Lang, string>>;
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ lang, altPath, title, lastUpdated, children }: Props) {
  return (
    <>
      <Header lang={lang} altPath={altPath} />
      <main className="bg-white">
        <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <h1 className="font-bold text-3xl md:text-5xl mb-2 leading-tight">{title}</h1>
          {lastUpdated && <p className="text-sm text-[#5a5a5a] mb-10">Last updated: {lastUpdated}</p>}
          <div className="text-[#1a1a1a] leading-relaxed text-base">{children}</div>
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
