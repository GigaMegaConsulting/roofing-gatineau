import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import { resolveLang, langStaticParams } from "@/lib/lang";

interface Props {
  children: React.ReactNode;
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
  return {
    title: { default: c.seoTitle, template: `%s | ${c.brandName}` },
    description: c.seoDescription,
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!resolveLang(lang)) notFound();
  return <>{children}</>;
}
