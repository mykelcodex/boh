# Bridge of Hope — Nuxt 3 + Tailwind CSS 4

Static-friendly Nuxt app of the Bridge of Hope site. Same four pages, same
design, rebuilt with Tailwind utilities instead of hand-written CSS.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # SSR/Node build   → .output/
npm run generate   # static export     → .output/public/
```

Node 20+.

## Structure

```
app.config.ts              editable content: contact details, bank details, socials, team,
                           and programsLayout ('cards' | 'accordion')
assets/css/main.css        Tailwind v4 @theme tokens + a handful of component classes
utils/content.ts           programme copy, core values, mission and vision statements
components/                NavBar, SiteFooter, GiveModal, AppIcon
composables/useGive.ts     donate-modal open/close state (useState, SSR-safe)
layouts/default.vue        nav + page + footer + modal
pages/                     index, about, what-we-do, contact
server/api/                contact.post.ts, newsletter.post.ts
public/assets/             logo files
public/images/             hero.jpg and story.jpg go here
```

## Tailwind

Tailwind 4 is wired through `@tailwindcss/vite` — there is no `tailwind.config.js`.
All design tokens live in the `@theme` block of `assets/css/main.css` and are
available as ordinary utilities:

| Token group   | Utilities                                                       |
| ------------- | --------------------------------------------------------------- |
| Brand green   | `bg-green-500` … `bg-green-800`, `text-green-200`               |
| Gold          | `bg-gold-500`, `text-gold-ink`, `bg-gold-100`                   |
| Warm neutrals | `bg-sand-50` … `text-sand-500`                                  |
| Semantic      | `text-ink`, `text-body`, `text-muted`, `border-line`            |
| Elevation     | `shadow-e1` … `shadow-e4`, `shadow-field`                       |
| Type          | `font-serif` (Crimson Pro), `font-sans` (Plus Jakarta Sans), `` |

Repeated patterns are component classes in the same file: `.wrap`, `.section`,
`.eyebrow`, `.h-display`, `.h-section`, `.lead`, `.card`, `.btn-gold`,
`.btn-green`, `.btn-outline-light`, `.btn-secondary`, `.field`.

## Forms

`POST /api/contact` and `POST /api/newsletter` validate, rate-limit (5/min per IP),
and append to `.data/*.ndjson` so nothing is lost before a database exists.
The contact endpoint also carries a honeypot field. Swap `appendRecord` in
`server/utils/store.ts` for your database, and add the transactional email send
(Resend, Postmark, SES) where the TODO sits in `server/api/contact.post.ts`.

For a fully static deploy (`npm run generate`), point the two forms at a form
service or a serverless function instead — Nitro API routes need a Node host.

## Before launch

1. Add `public/images/hero.jpg` and `public/images/story.jpg`.
2. Fill real contact, bank, and social values in `app.config.ts`.
3. Complete the mission statement in `utils/content.ts` (the supplied text ends
   mid-sentence) and replace the founding story, impact numbers, and testimonials.
4. Add team members to `app.config.ts` — the leadership section stays hidden while empty.
5. Replace the map placeholder on `/contact` with a real embed.
