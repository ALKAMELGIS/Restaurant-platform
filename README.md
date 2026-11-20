# Restaurant Platform — Dish Orbit Carousel integration

Scaffold for the restaurant-management platform's "Menu & Food Management"
module (see section 4.6 of the product brief), built to hold the
`DishOrbitCarousel` component as its scroll-driven dish showcase.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS with shadcn/ui CSS-variable theme (`components.json` present,
  so `npx shadcn add <component>` works for anything added later)
- GSAP + ScrollTrigger (used only by the carousel itself)

## Project layout

```
src/
  components/
    ui/dish-orbit-carousel.tsx   # the component, copied in as-is
    sections/dish-orbit-demo.tsx # the sample dish data + usage
  lib/utils.ts                   # cn() helper shadcn components expect
  index.css                      # design tokens: light/dark, RTL font stack
  App.tsx                        # shell with language + theme toggles
```

### Why `src/components/ui` specifically

The shadcn CLI, and every shadcn component's own source, imports its
neighbors from `@/components/ui/*`. Moving the carousel to another folder
breaks that resolution path for any future shadcn component that expects to
sit next to it, and breaks `components.json`'s own `aliases.ui` setting. This
project was created with that path as the default, so no migration is
needed — new shadcn components can be added straight into the same folder.

## Setup

Dependencies could not be installed from this session (no network access to
npm here), so run this on your machine before anything else:

```bash
npm install
npm run dev
```

If you are instead dropping this into an existing codebase that is not yet a
shadcn project, run first:

```bash
npx shadcn@latest init
npm install gsap
```

`shadcn init` asks for the same answers already baked into
`components.json` here (style: new-york, base color: neutral, CSS
variables: yes) — keep those answers so the generated tokens in
`src/index.css` and the ones here stay compatible.

## Design decisions tied to the platform brief

- **RTL + LTR**: `App.tsx` toggles `document.documentElement.dir` between
  `rtl` and `ltr`; Tailwind's built-in `rtl:`/`ltr:` variants need no plugin.
  Arabic text falls back to IBM Plex Sans Arabic, Latin text to Outfit (the
  same face the carousel already embeds for its own canvas).
- **Light/dark mode**: class-based (`.dark` on `<html>`), matching shadcn's
  convention, so any shadcn component added later shares the same switch.
- **Color**: a warm amber primary (`--primary`) rather than a generic SaaS
  blue — closer to the dish accent colors the carousel itself displays, and
  more legible against food photography than blue would be.

## Carrying this into the full platform

The carousel reads `dishes` as plain props, so the only wiring the bigger
platform (section 4.6) still needs is replacing `src/components/sections/
dish-orbit-demo.tsx`'s static array with the restaurant's real menu rows —
same `Dish` shape, fetched per branch. Two follow-ups worth planning for
before that:

- `onPlay`, `onOrder`, and `onChange` are already exposed; `onOrder` is the
  natural hook into the order-management module's "add to cart" flow.
- The brief's AI Food Image Studio (4.5) is meant to produce the exact kind
  of cut-out, top-down plate photos this carousel expects as `image` — once
  that pipeline exists, point `dish.image` at its output instead of stock
  photography.
