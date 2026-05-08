import { siteConfig, type Lang } from "@/lib/site.config";

interface Props {
  lang: Lang;
}

export function Testimonials({ lang }: Props) {
  const c = siteConfig[lang]!;
  if (!c.testimonials || c.testimonials.length === 0) return null;
  return (
    <section className="bg-white py-16 md:py-20 border-t border-[#e6e6e6]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {c.testimonials.map((tt, i) => (
            <div key={i} className="bg-[#f5f5f5] rounded-md p-6 md:p-8">
              <p className="italic text-[#1a1a1a] leading-relaxed text-base md:text-[17px] mb-3">
                &ldquo;{tt.quote}&rdquo;
              </p>
              <p className="text-[#0a0a0a] font-medium not-italic">– {tt.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
