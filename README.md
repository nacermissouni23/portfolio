# Portfolio — Nacer Eddine Missouni (Next.js)

Personal portfolio site: AI, Data Science and Web Dev projects with per-project
workflow diagrams, plus a working contact form.

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

Project workflow diagrams are pre-rendered to static SVG and stored in
`public/diagrams/`; there is no runtime diagram rendering. To regenerate after
editing a diagram, run:

```bash
node scripts/generate-diagrams.mjs
```

This requires the dev-only `mermaid` and `puppeteer-core` dependencies and a
local Chrome install (see the `executablePath` in the script).

## Routes

- `/` — home (hero, about, services, work preview, process, contact)
- `/work` — categories (AI / Data Science / Web Dev)
- `/work/ai`, `/work/data-science`, `/work/web-dev`
- `/work/<category>/<slug>` — project detail + workflow diagram

## Portrait image

The home page about section loads `/nacer.png` from `public/`.
