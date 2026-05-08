// Legal page substitutions. Brand/contact values shared across both languages.
import { siteConfig, type Lang } from "./site.config";

const PROVINCE_NAMES: Record<string, string> = {
  QC: "Quebec",
  ON: "Ontario",
};

export function legalContext(lang: Lang) {
  const c = siteConfig[lang]!;
  return {
    brand: c.brandName,
    domain: siteConfig.domain,
    url: `https://${siteConfig.domain}`,
    email: siteConfig.email,
    address: siteConfig.address,
    country: `${PROVINCE_NAMES[siteConfig.state] ?? siteConfig.state}, Canada`,
  };
}
