import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

const primary = siteConfig[siteConfig.primaryLang]!;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: { default: primary.seoTitle, template: `%s | ${primary.brandName}` },
  description: primary.seoDescription,
  // Open Graph + Twitter card boost click-through when the site is shared
  // socially or appears in messenger previews.
  openGraph: {
    type: "website",
    locale: siteConfig.primaryLang === "fr" ? "fr_CA" : "en_CA",
    siteName: primary.brandName,
    title: primary.seoTitle,
    description: primary.seoDescription,
    url: `https://${siteConfig.domain}`,
    images: siteConfig.heroImage ? [{ url: siteConfig.heroImage, alt: primary.brandName }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: primary.seoTitle,
    description: primary.seoDescription,
    images: siteConfig.heroImage ? [siteConfig.heroImage] : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Enriched LocalBusiness schema — geo coordinates, opening hours, payment
  // methods accepted, and an offer catalog of services. Heavier signal for
  // the Google local pack (the map-card on top of SERP) than a bare
  // LocalBusiness type.
  //
  // City coordinates: Gatineau city centre (45.4765, -75.7013).
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://${siteConfig.domain}/#business`,
    name: primary.brandName,
    description: primary.seoDescription,
    url: `https://${siteConfig.domain}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: siteConfig.heroImage ? `https://${siteConfig.domain}${siteConfig.heroImage}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4765,
      longitude: -75.7013,
    },
    areaServed: siteConfig.locationNames.map(name => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: siteConfig.state === "QC" ? "Québec" : siteConfig.state,
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Interac e-Transfer"],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: siteConfig.primaryLang === "fr" ? "Services de débarras" : "Junk removal services",
      itemListElement: (primary.services || []).map(svc => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.title,
          description: svc.description,
          url: `https://${siteConfig.domain}/${siteConfig.primaryLang}/${svc.slug}`,
        },
      })),
    },
  };

  return (
    <html lang={siteConfig.primaryLang}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      </body>
    </html>
  );
}
