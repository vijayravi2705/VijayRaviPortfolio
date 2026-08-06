# Vijay R — Portfolio

Personal portfolio site for **Vijay R** — Software Engineer, Full Stack Developer, and Applied ML Engineer.

Built with [Next.js](https://nextjs.org) (App Router), fully localized via `next-intl`, with an animated, cinematic UI.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4 + `shadcn/ui`
- **Animations:** GSAP, Framer Motion, three.js (Three)
- **i18n:** next-intl (15 locales, RTL support for Arabic)
- **Theming:** next-themes (light / dark)
- **Contact form:** EmailJS



## Getting Started

Install dependencies:

```bash
npm install
```

Set up environment variables (see below), then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The contact form uses EmailJS. Copy `.env.local.example` to `.env.local` (or create it) and fill in:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Available Scripts

```bash
npm run dev      # start the development server
npm run build    # build for production
npm run start    # start the production server
npm run lint     # run ESLint
```

## Project Structure

```
app/[locale]/        # localized routes, layout, page
components/          # UI components (hero, about, work, contact, nav, ...)
constants/           # projects, contact, credentials, leadership data
i18n/                # next-intl routing & request config
messages/            # translation files (one JSON per locale)
lib/                 # utilities
public/              # static assets
```
