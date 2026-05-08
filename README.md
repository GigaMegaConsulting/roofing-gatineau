# roofing-gatineau

Local lead generation site for **roofing contractors** in **Gatineau, QC**.

Generated from the [lead-landlord](../../) template.

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

Deployed to Vercel. Domain: **gatineaucouvreur.com**.

## Per-site config

All site-specific copy lives in [`src/lib/site.config.ts`](src/lib/site.config.ts). UI strings (form labels etc.) by language live in [`src/lib/copy.ts`](src/lib/copy.ts).
