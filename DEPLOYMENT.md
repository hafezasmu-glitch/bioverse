# Deploy BioVerse

## Netlify from a source repository

1. Upload this project root to GitHub (the folder containing `package.json`).
2. In Netlify choose **Add new project → Import an existing project**.
3. Select the repository. Netlify detects Next.js automatically.
4. Build command: `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to the final production origin, for example `https://biovers.netlify.app`.
6. Deploy. Check `/sitemap.xml`, `/robots.txt`, `/human-body`, and `/cell-world` afterward.

Requires Node.js 20.9 or newer. The repository intentionally excludes `node_modules` and `.next`; Netlify installs and builds them.

## Important

Do not use a static drag-and-drop deployment for this source ZIP. BioVerse is a Next.js application and `/human-body` uses server rendering for its optional focus query. Use Netlify's repository-based Next.js build or an equivalent supported Next.js deployment.
