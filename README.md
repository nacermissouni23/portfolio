# Portfolio — Nacer Eddine Missouni (Next.js)

Personal portfolio site: AI, Data Science and Web Dev projects, with workflow
diagrams for apps/notebooks and live screenshots for websites, plus a working
contact form. Public projects link to their GitHub repository; deployed web
projects link to the live site.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Contact form

The home page contact form posts to `/api/contact`, which emails submissions to
`missouni23@gmail.com`.

- Default (zero-config): messages are forwarded via
  [FormSubmit](https://formsubmit.co). The first submission triggers a one-time
  activation email to the recipient — confirm it once and delivery starts.
- Optional: set `RESEND_API_KEY` (and `CONTACT_FROM`) to send through
  [Resend](https://resend.com) instead. See `.env.example`.

## Workflow diagrams

Notebooks and apps get a pre-rendered workflow diagram stored in
`public/diagrams/`; there is no runtime diagram rendering. Websites with a live
deployment show screenshots instead. To regenerate diagrams after editing one,
run:

```bash
node scripts/generate-diagrams.mjs
```

This requires the dev-only `mermaid` and `puppeteer-core` dependencies and a
local Chrome install (see the `executablePath` in the script).

## Screenshots

Websites with a live deployment have desktop and mobile captures in
`public/screenshots/` (`<slug>-desktop.png` and `<slug>-mobile.png`). After
changing a live site, recapture them with:

```bash
node scripts/generate-screenshots.mjs             # all sites
node scripts/generate-screenshots.mjs al-djisr    # one or more sites
```

The list of sites, live URLs and GitHub links lives in `lib/data.ts`.

## Routes

- `/` — home (hero, about, services, work preview, process, contact)
- `/work` — categories (AI / Data Science / Web Dev)
- `/work/ai`, `/work/data-science`, `/work/web-dev`
- `/work/<category>/<slug>` — project detail with live/GitHub links, plus a
  workflow diagram (notebooks/apps) or screenshots (websites)

## Portrait image

The home page about section loads `/nacer.png` from `public/`.
