# Razon Live Lab (razonlab.com)

Static site for Razon Live Lab. One self-contained HTML file, no build step.

## Files

- `index.html` - the entire site (inline CSS, link config in the `LINKS` script at the top of `<body>`)
- `favicon.png` - logo / favicon
- `og.png` - social share image (1200x630)

## Deploying

Hosted on Vercel, project `razonlab-site`, production domain `razonlab.com`.

This repo is not yet connected to Vercel for push-to-deploy. Either:

1. `vercel --prod` from this folder (CLI), or
2. Link this repo in the Vercel dashboard: Project Settings > Git > Connect, then every push to `main` deploys.
