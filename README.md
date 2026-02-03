# LogHouse by the Lake – Project Summary & Handover

---

## What this project is

**LogHouse by the Lake** is a **Sanity Studio** (headless CMS) project. It is the content backend only: editors use this Studio to manage content; a separate frontend (not in this repo) would consume the data via the Sanity API or GraphQL.

- **Project ID:** `io5wefjf`
- **Dataset:** `production`
- **Stack:** Sanity v5, React 19, TypeScript, styled-components
- **Deployment:** Studio is built and deployed to **Netlify** (`npm run build` → `dist/`)

---

## How it's built and run

| Command                  | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `npm run dev`            | Start Studio in dev mode (with hot reload) |
| `npm run start`          | Start production build locally             |
| `npm run build`          | Build static Studio to `dist/`             |
| `npm run deploy`         | Deploy Studio to Sanity's hosted URL       |
| `npm run deploy-graphql` | Deploy GraphQL API for the dataset         |

**Config files:**

- [sanity.config.ts](sanity.config.ts) – Studio config: project/dataset, plugins (structure tool, Vision), schema, singleton handling
- [sanity.cli.ts](sanity.cli.ts) – CLI config: same project/dataset, auto-updates for Studio
- [netlify.toml](netlify.toml) – Netlify: build command `npm run build`, publish `dist`, Node 20
- [public/\_redirects](public/_redirects) – SPA-style redirect for Netlify (`/* /index.html 200`)

**Code quality:** ESLint (Sanity studio config), Prettier (no semicolons, single quotes, 100 print width).

---

## Repository layout

```
schemas/
  documents/     # Document types (pages, globals)
    homePage.ts
    page.ts
    footer.ts
    headerOffcanvas.ts
    robotsTxt.ts
  objects/       # Reusable block/component schemas
    hero.ts
    infoBlock.ts
    accordion.ts
    clients.ts
schemaTypes/
  index.ts       # Central export: imports from schemas/ and eventType, registers all types
  eventType.ts   # Event document type (name: 'event')
structure.ts     # Custom Studio sidebar structure (Pages vs Globals)
sanity.config.ts
sanity.cli.ts
```

**Important:** All schema types are **registered in one place**: [schemaTypes/index.ts](schemaTypes/index.ts). Adding a new document or object type means:

1. Define it under `schemas/documents/` or `schemas/objects/`.
2. Import it in `schemaTypes/index.ts` and add it to the `schemaTypes` array.
3. Optionally add it to [structure.ts](structure.ts) so it appears in the desired sidebar section.

---

## Content model (key concepts)

### Documents vs objects

- **Documents** are top-level, listable content (have a URL in the Studio). Stored in the dataset as separate documents.
- **Objects** are embedded building blocks (no standalone URL). Used inside document fields (e.g. in a `sections` array).

### Pages

- **Home page** (`homePage`) – Single homepage with `title`, `slug` (e.g. `/`), **sections** array, and **SEO** object.
- **Pages** (`page`) – Generic pages with `title`, `slug`, **sections**, and **SEO**.
- **Events** (`event`) – Simple document type (currently just `name`); listable under Pages in the structure.

Both `homePage` and `page` use the same **sections** pattern: an array of block types. Allowed section types: `infoBlock`, `hero`, `accordion`, `clients`. Each section is an object type with its own fields and preview.

### Globals (singletons)

These are **one-per-site** and are configured as singletons in the Studio:

| Type                                     | Purpose                                                                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Footer** (`footer`)                    | Title, description, copyright, social links (icon + URL), address, contact (phone, email). Document ID: `footer`. |
| **Header Offcanvas** (`headerOffcanvas`) | Toggle, logo, description, CTA button, contact info. Document ID: `headerOffcanvas`.                              |
| **robots.txt** (`robotsTxt`)             | `disallowAll` boolean and list of sitemap URLs. Document ID: `robotsTxt`.                                         |

In [sanity.config.ts](sanity.config.ts), `singletonTypes` is used to (1) hide these from "Create new document" templates and (2) restrict document actions so they behave as single global configs.

### Section blocks (objects)

Used inside `sections` on `homePage` and `page`:

| Block          | Role                                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**       | Pre-title, title, rich text description, image (with alt), optional button (label + href).                                                          |
| **Info Block** | Pre-title, title, rich text description, optional divider, optional button (label, href, variant: primary/secondary/link), optional image with alt. |
| **Accordion**  | Section title + list of items (title + rich text description; links allowed). Validation: at least 3 items.                                         |
| **Clients**    | Optional enable, title, exactly 8 client logos (image + alt), and display options (columns per row: 4/6; appearance: light/dark).                   |

Rich text uses Sanity's `block` type (Portable Text). Accordion descriptions use a limited block config (bold/italic/underline, link annotation).

---

## Studio structure (sidebar)

Defined in [structure.ts](structure.ts):

1. **Pages** – Home page (list of `homePage`), Pages (list of `page`), Events (list of `event`).
2. **Globals** – Footer, Header Offcanvas, robots.txt (each opens the single document by fixed ID).
3. **Everything else** – Any other document types that might be added later, so they still appear in the sidebar.

---

## Concepts a new dev should know

1. **Singletons** – Footer, header offcanvas, and robots.txt are single documents with fixed IDs. The config restricts duplicate creation and limits actions (publish, discard, restore).
2. **Section-based pages** – Page content is built from an ordered list of block types; adding a new block type means defining an object schema, registering it in `schemaTypes/index.ts`, and adding it to the `sections` array in `homePage` and `page`.
3. **SEO** – Pages and home have a shared SEO object (title, meta description, OG title/description/image, noIndex, noFollow). Frontend is responsible for reading these and rendering meta tags.
4. **No frontend in repo** – This repo is Studio only. The frontend (Next.js, Astro, etc.) would use `@sanity/client` or GraphQL and the same project/dataset to fetch documents and render pages.
5. **Netlify** – Building and publishing the Studio is done via Netlify; redirects ensure SPA-style routing. No server-side code in this repo.

---

## Quick reference

- **Sanity docs:** [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **Schema types:** [schemaTypes/index.ts](schemaTypes/index.ts)
- **Sidebar structure:** [structure.ts](structure.ts)
- **Singleton config:** [sanity.config.ts](sanity.config.ts) (e.g. `singletonTypes`, `document.actions`)
