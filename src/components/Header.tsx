"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, availableLangs, type Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
  // for the language switcher: optional mapping from current slug to the same
  // page in the other language (different slug per language).
  altPath?: Partial<Record<Lang, string>>;
}

type Expanded = "services" | "locations" | null;

export function Header({ lang, altPath }: Props) {
  const c = siteConfig[lang];
  const tt = t(lang);
  const langs = availableLangs();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Expanded>(null);

  // Lock background scroll when the mobile menu is open. Restore on close +
  // on unmount so we never strand the body in a locked state.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  // Close the menu after navigation. The link's default click will navigate;
  // we just reset state so it's clean when the next page mounts.
  const closeMenu = () => { setMobileOpen(false); setExpanded(null); };

  if (!c) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 md:h-[88px] flex items-center justify-between gap-4">
        {/* Phone chrome (left). Smaller on mobile so it fits. */}
        <a href={`tel:${siteConfig.phone}`} className="phone-chrome text-base md:text-2xl">
          {siteConfig.phoneDisplay}
        </a>

        {/* Desktop nav (right) */}
        <nav className="hidden md:flex items-stretch gap-6 text-sm uppercase tracking-wide text-[#0a0a0a] h-full">
          <Link href={`/${lang}`} className="font-medium border border-[#0a0a0a] px-3 py-1.5 rounded self-center">
            {tt.home}
          </Link>

          <div className="relative group h-full flex items-center">
            <Link href={`/${lang}/services`} className="uppercase hover:underline">{tt.services}</Link>
            <div className="absolute right-0 top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition pointer-events-none group-hover:pointer-events-auto z-50">
              <ul className="bg-white border border-[#e6e6e6] rounded-md shadow-lg py-2">
                <li>
                  <Link href={`/${lang}/services`} className="block px-4 py-2 text-[13px] normal-case tracking-normal text-[#0a0a0a] font-semibold border-b border-[#e6e6e6] hover:bg-[#f5f5f5]">
                    {tt.seeAllServices} →
                  </Link>
                </li>
                {c.services.map(s => (
                  <li key={s.slug}>
                    <Link href={`/${lang}/${s.slug}`} className="block px-4 py-2 text-[13px] normal-case tracking-normal text-[#0a0a0a] hover:bg-[#f5f5f5]">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href={`/${lang}/faq`} className="hover:underline flex items-center">{tt.faq}</Link>

          <Link href={`/${lang}/about`} className="hover:underline flex items-center">{tt.about}</Link>

          <div className="relative group h-full flex items-center">
            <Link href={`/${lang}/locations`} className="uppercase hover:underline">{tt.locations}</Link>
            <div className="absolute right-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition pointer-events-none group-hover:pointer-events-auto z-50">
              <ul className="bg-white border border-[#e6e6e6] rounded-md shadow-lg py-2 max-h-[60vh] overflow-y-auto">
                <li>
                  <Link href={`/${lang}/locations`} className="block px-4 py-2 text-[13px] normal-case tracking-normal text-[#0a0a0a] font-semibold border-b border-[#e6e6e6] hover:bg-[#f5f5f5]">
                    {tt.seeAllAreas} →
                  </Link>
                </li>
                {c.locations.map((loc, i) => (
                  <li key={loc.slug}>
                    <Link href={`/${lang}/${loc.slug}`} className="block px-4 py-2 text-[13px] normal-case tracking-normal text-[#0a0a0a] hover:bg-[#f5f5f5]">
                      {siteConfig.locationNames[i]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href={`/${lang}/contact`} className="hover:underline flex items-center">{tt.contact}</Link>

          {langs.length > 1 && (
            <div className="flex items-center gap-1 text-xs ml-2 pl-4 border-l border-[#e6e6e6] self-center">
              {langs.map(l => {
                const target = l === lang ? null : (altPath?.[l] ?? `/${l}`);
                return target ? (
                  <Link key={l} href={target} className="px-1.5 hover:underline">{l.toUpperCase()}</Link>
                ) : (
                  <span key={l} className="px-1.5 font-bold underline">{l.toUpperCase()}</span>
                );
              })}
            </div>
          )}
        </nav>

        {/* Mobile hamburger trigger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-[#0a0a0a]"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 8h20" />
            <path d="M4 14h20" />
            <path d="M4 20h20" />
          </svg>
        </button>
      </div>

      {/* Mobile fullscreen overlay menu. Scrolls internally; bg scroll locked. */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#e6e6e6] flex-shrink-0">
            <a href={`tel:${siteConfig.phone}`} className="phone-chrome text-base">{siteConfig.phoneDisplay}</a>
            <button
              type="button"
              className="inline-flex items-center justify-center w-11 h-11 -mr-2 text-[#0a0a0a]"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l16 16" />
                <path d="M22 6L6 22" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 text-[#0a0a0a]">
            <ul className="flex flex-col">
              <li>
                <Link
                  href={`/${lang}`}
                  className="block py-4 border-b border-[#e6e6e6] uppercase text-base tracking-wide"
                  onClick={closeMenu}
                >
                  {tt.home}
                </Link>
              </li>

              <li className="border-b border-[#e6e6e6]">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-4 uppercase text-base tracking-wide cursor-pointer"
                  aria-expanded={expanded === "services"}
                  onClick={() => setExpanded(expanded === "services" ? null : "services")}
                >
                  {tt.services}
                  <span className={"text-xl transition-transform " + (expanded === "services" ? "rotate-45" : "")}>+</span>
                </button>
                {expanded === "services" && (
                  <ul className="pb-3">
                    <li>
                      <Link
                        href={`/${lang}/services`}
                        className="block py-2 pl-4 text-[15px] font-semibold text-[#0a0a0a]"
                        onClick={closeMenu}
                      >
                        {tt.seeAllServices} →
                      </Link>
                    </li>
                    {c.services.map(s => (
                      <li key={s.slug}>
                        <Link
                          href={`/${lang}/${s.slug}`}
                          className="block py-2 pl-4 text-[15px] text-[#1a1a1a]"
                          onClick={closeMenu}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href={`/${lang}/faq`}
                  className="block py-4 border-b border-[#e6e6e6] uppercase text-base tracking-wide"
                  onClick={closeMenu}
                >
                  {tt.faq}
                </Link>
              </li>

              <li>
                <Link
                  href={`/${lang}/about`}
                  className="block py-4 border-b border-[#e6e6e6] uppercase text-base tracking-wide"
                  onClick={closeMenu}
                >
                  {tt.about}
                </Link>
              </li>

              <li className="border-b border-[#e6e6e6]">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-4 uppercase text-base tracking-wide cursor-pointer"
                  aria-expanded={expanded === "locations"}
                  onClick={() => setExpanded(expanded === "locations" ? null : "locations")}
                >
                  {tt.locations}
                  <span className={"text-xl transition-transform " + (expanded === "locations" ? "rotate-45" : "")}>+</span>
                </button>
                {expanded === "locations" && (
                  <ul className="pb-3">
                    <li>
                      <Link
                        href={`/${lang}/locations`}
                        className="block py-2 pl-4 text-[15px] font-semibold text-[#0a0a0a]"
                        onClick={closeMenu}
                      >
                        {tt.seeAllAreas} →
                      </Link>
                    </li>
                    {c.locations.map((loc, i) => (
                      <li key={loc.slug}>
                        <Link
                          href={`/${lang}/${loc.slug}`}
                          className="block py-2 pl-4 text-[15px] text-[#1a1a1a]"
                          onClick={closeMenu}
                        >
                          {siteConfig.locationNames[i]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="block py-4 border-b border-[#e6e6e6] uppercase text-base tracking-wide"
                  onClick={closeMenu}
                >
                  {tt.contact}
                </Link>
              </li>

              {langs.length > 1 && (
                <li className="pt-6 flex items-center gap-3 text-sm">
                  {langs.map(l => {
                    const target = l === lang ? null : (altPath?.[l] ?? `/${l}`);
                    return target ? (
                      <Link key={l} href={target} onClick={closeMenu} className="px-3 py-2 border border-[#e6e6e6] rounded">
                        {l.toUpperCase()}
                      </Link>
                    ) : (
                      <span key={l} className="px-3 py-2 border border-[#0a0a0a] rounded font-bold">
                        {l.toUpperCase()}
                      </span>
                    );
                  })}
                </li>
              )}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#e6e6e6]">
              <a
                href={`tel:${siteConfig.phone}`}
                className="block bg-black text-white text-center uppercase tracking-wide font-semibold px-6 py-4 rounded"
                onClick={closeMenu}
              >
                {tt.callNowFor} — {siteConfig.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
