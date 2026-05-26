# roofing-gatineau

Local lead generation site for **roofing contractors** in **Gatineau, QC** — live at **[gatineaucouvreur.com](https://gatineaucouvreur.com)**.

Bilingual (FR-first / EN secondary) Next.js 16 site targeting search queries like *couvreur Gatineau*, *réfection toiture Outaouais*, and *bardeaux vs tôle Québec*. Includes:

- Service-area pages for every Gatineau neighbourhood (Hull, Aylmer, Buckingham, Masson-Angers, Pointe-Gatineau, Cantley, Chelsea, La Pêche, Templeton, Val-des-Monts, Limbour) — see the live [locations index](https://gatineaucouvreur.com/fr/locations)
- A long-tail content cluster covering the high-intent questions Gatineau homeowners actually search, anchored by guides on [emergency roof leaks](https://gatineaucouvreur.com/fr/fuite-toiture-urgence), [signs of roof damage](https://gatineaucouvreur.com/fr/signes-toiture-endommagee), [asphalt shingles vs metal roofing](https://gatineaucouvreur.com/fr/bardeaux-vs-tole), [roof inspections](https://gatineaucouvreur.com/fr/inspection-toiture), [winter and ice-dam prevention](https://gatineaucouvreur.com/fr/toiture-hiver-quebec), and [roofing warranties](https://gatineaucouvreur.com/fr/garantie-toiture)
- Full LocalBusiness + Article + BreadcrumbList JSON-LD across the site for rich-result eligibility
- Bilingual hreflang, optimized sitemap, IndexNow integration

Generated from a shared lead-landlord template.

## Related GigaMega projects

- **[gatineaudebarras.com](https://gatineaudebarras.com)** ([repo](https://github.com/GigaMegaConsulting/junk-removal-gatineau)) — Junk removal serving the same Outaouais region, built from the same template.
- **[snapaireport.com](https://snapaireport.com)** ([repo](https://github.com/GigaMegaConsulting/snapaireport)) — AI-driven business assessment tool for SMBs.

## Stack

- Next.js 16 (App Router) + Turbopack
- React 19
- Tailwind CSS v4
- TypeScript

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deploy

Deployed to Vercel — pushes to `main` auto-deploy. Production domain: **[gatineaucouvreur.com](https://gatineaucouvreur.com)**.

## Per-site config

All site-specific copy lives in [`src/lib/site.config.ts`](src/lib/site.config.ts). UI strings (form labels etc.) by language live in [`src/lib/copy.ts`](src/lib/copy.ts). Long-form guide content is in [`src/lib/long-tail-content.ts`](src/lib/long-tail-content.ts) with one entry per slug.
