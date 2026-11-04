# Raman's Research Lab — ebalaraman.com

Website of Dr. Ekambaram Balaraman's research group, Department of Chemistry, IISER Tirupati.

Built with Next.js (App Router), React, Tailwind CSS and framer-motion. Hosted on Vercel.

## Run locally

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # production build; run before every push
npm run lint
```

## Where content lives

| What | File |
|------|------|
| Team, alumni, news, PI stats, patents | `app/data.ts` |
| All publications | `app/publications_master.ts` |
| Homepage featured publications | `app/publications_featured.ts` |
| SEO metadata, JSON-LD | `app/layout.tsx`, `app/*/layout.tsx` |
| Images | `public/images/` (use `.webp`) |

## Images

- Add photos as `.webp`. Keep them under about 300 KB and at most 1920 px wide.
- Gallery photos: put `<n>.webp` in `public/images/gallery/` and add an entry in `components/ui/framer-thumbnails.tsx`.
- To shrink large gallery files: `node scripts/recompress-gallery.mjs public/images/gallery`.

## Deploy workflow

`master` deploys straight to production at https://www.ebalaraman.com.

1. Create a branch: `git switch -c fix/short-description`
2. Commit and push the branch. Vercel builds a preview URL for it.
3. Check the preview, then open a pull request and merge into `master`.

Do not push directly to `master`.
