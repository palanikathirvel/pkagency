# P.K Creative Agency — Website

Premium, conversion-focused website for **P.K Creative Agency** — *Turning Ideas Into Digital Experiences*.

Built with **React 18 + Vite + Tailwind CSS v4 + Framer Motion + Lucide Icons**, with TypeScript throughout.

---

## ✨ Features

- **Pages:** Home, Services, Work (portfolio), About, Contact, Admin Dashboard, 404
- **Lead generation:** full inquiry form with validation, loading & success states — every submission lands in the Admin dashboard
- **Admin dashboard:** passcode-protected (demo passcode: `pk-admin-2026`), with stat overview, searchable/filterable inquiry table, status pipeline (`NEW → CONTACTED → IN_DISCUSSION → CONVERTED → CLOSED`), detail modal, delete with confirm, and one-click demo data
- **Floating WhatsApp button** with pre-filled message
- **SEO:** dynamic titles/descriptions, Open Graph tags, JSON-LD schema, `sitemap.xml`, `robots.txt`
- **Accessibility:** semantic HTML, full `prefers-reduced-motion` support, keyboard-friendly
- **Responsive:** designed for 320px → 1440px+

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Production build (outputs to dist/)
npm run build

# 4. Type-check only
npm run typecheck
```

No environment variables are required — the site runs fully client-side out of the box.

---

## 🗂 Project Structure

```
src/
├── components/        # Navbar, Hero, Services, Portfolio, Process,
│                      # Testimonials, Pricing, ContactForm, Footer,
│                      # WhatsAppFloat, Logo, shared UI primitives
├── pages/             # Home, ServicesPage, WorkPage, AboutPage,
│                      # ContactPage, AdminPage
├── data/              # services.ts · projects.ts · testimonials.ts · siteContent.ts
├── config/
│   └── agencyConfig.ts   # ⭐ ALL agency identity in ONE file
├── hooks/             # usePageMeta, useScramble, useCountUp, useInViewOnce
├── services/
│   └── inquiryService.ts # API layer mirroring the Spring Boot contract
└── App.tsx            # Router (HashRouter — works on any static host)
```

---

## ⭐ Customizing Content (start here)

**Everything about the agency lives in `src/config/agencyConfig.ts`:**

| Key | What it controls |
|---|---|
| `name`, `shortName`, `tagline` | Branding across the whole site |
| `logoSrc` | Logo image (navbar, footer, loader) |
| `email`, `phone`, `location` | Contact details everywhere |
| `whatsappNumber`, `whatsappMessage` | Floating WhatsApp button |
| `socials` | Footer social links |
| `stats` | Hero/about counters (edit freely) |
| `adminPasscode` | Admin dashboard access |
| `serviceOptions`, `budgetOptions`, `timelineOptions` | Contact form dropdowns |

Other content:

- **Services** → `src/data/services.ts`
- **Projects** → `src/data/projects.ts` (images, tech, categories)
- **Testimonials** → `src/data/testimonials.ts` *(currently placeholders — replace with real quotes)*
- **Team / process / pricing / FAQs** → `src/data/siteContent.ts`

> ⚠️ All client names, testimonials, team members and statistics are clearly-marked **placeholders**. Replace them with real information before going public.

---

## 🔌 Backend Integration

The frontend ships with a localStorage-backed service layer (`src/services/inquiryService.ts`) that mirrors this REST contract, so it works standalone and swaps to a real backend with zero component changes:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/inquiries` | Submit inquiry (→ confirmation email + owner notification) |
| `GET` | `/api/inquiries` | List all (admin, protected) |
| `GET` | `/api/inquiries/{id}` | Single inquiry |
| `PUT` | `/api/inquiries/{id}/status` | Update status |
| `DELETE` | `/api/inquiries/{id}` | Remove spam |

Recommended backend: **Spring Boot + Spring Data JPA + PostgreSQL** (or MongoDB).

---

## 🌐 Deployment

Static build — deploys anywhere:

- **Vercel / Netlify:** import the repo, build command `npm run build`, output directory `dist`
- **GitHub Pages:** works as-is thanks to `base: "./"` and HashRouter
- **Any web server:** upload the contents of `dist/`

---

## License

© 2026 P.K Creative Agency. All rights reserved.
