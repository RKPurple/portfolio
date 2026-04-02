# Portfolio — Project Overview

This is a personal portfolio for a full-stack software engineer. The goal is a visually
distinctive, animated portfolio that feels crafted — not templated.

---

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion, React Three Fiber
- **Deployment:** Vercel

---

## Core Design Concept

The portfolio uses a **morphing layout** approach rather than traditional page transitions.
Persistent UI elements (the name/logo, social icons, navigation) are shared across all pages
and physically reposition themselves as the user navigates — they don't disappear and
reappear, they *move*. Page-specific content fades in and out independently.

This is implemented using Framer Motion's `layoutId` prop. Elements with the same `layoutId`
on different pages animate between their positions automatically.

The aesthetic direction is **sharp and technical** — monospace typography, dark background,
editorial layout. It should feel like it was designed, not generated.

---

## Pages

### Enter (Intro Screen)
A fullscreen overlay rendered on the `/` route, controlled by local state. Visible on first load; dismissed on click,
triggering the first shared-element morph into the Hero layout. Not a separate route.
Implemented as `EnterOverlay.tsx` in `components/sections/`.

### Hero / Landing
The main introduction, rendered at `/`. Shows the name prominently, a short tagline, and the social dock.
This is the "home base" layout that other pages morph from and back to. The Enter overlay sits on top of
this page on first load and is dismissed via state.
Implemented as `HeroSection.tsx` in `components/sections/`.

### About
Background, skills, and personality. Layout shifts the name and social dock to new positions
while this page's content fades in.
Implemented as `AboutSection.tsx` in `components/sections/`.

### Projects
A collection of work. Can include a project detail view (`/projects/[slug]`). The name and
social icons reposition again to fit this layout.
Implemented as `ProjectsSection.tsx` and `ProjectDetail.tsx` in `components/sections/`.

### Contact
Simple contact section. Consistent with the morphing pattern.
Implemented as `ContactSection.tsx` in `components/sections/`.

### Resume
A separate route (`/resume`) for viewing the resume inline. The only page that breaks the
single-app-shell pattern — navigating here is a standard full-page transition, not a morph.
Linked from the Social Dock.

---

## Shared Persistent Elements

These elements appear on every page and morph between positions:

- **Nameplate** (`Nameplate.tsx`) — the name/logo. Changes size and position per page.
- **Social Dock** (`SocialDock.tsx`) — icons linking to LinkedIn, GitHub, email, resume. Changes orientation
  (row vs column) and position per page.
- **Page Navigation** (`PageNav.tsx`) — some fixed navigation element. Exact form TBD, but it must be
  persistent and feel anchored, not like a traditional navbar.

All three live in `components/layout/` and are always mounted via `AppShell.tsx`.

---

## Animation Philosophy

- Transitions should feel like the *layout is rearranging*, not pages swapping
- Use spring physics for morphing (feels physical, not mechanical)
- Page content (non-shared elements) fades independently of the morphing shell
- Scroll-triggered reveals within pages should fire once (`once: true`) as the user scrolls down
- All easing should use custom curves — avoid defaults. Something like `[0.22, 1, 0.36, 1]`
  for an expo-out feel

---

## Project Structure (Intent)

```
src/
├── app/                            # Next.js App Router pages
│   ├── layout.tsx                  # Root layout — wraps app in EnterProvider; mounts AppShell
│   ├── page.tsx                    # / — Enter overlay + Hero transition (state controlled via context)
│   ├── about/
│   │   └── page.tsx                # /about
│   ├── projects/
│   │   ├── page.tsx                # /projects
│   │   └── [slug]/
│   │       └── page.tsx            # /projects/:slug
│   ├── contact/
│   │   └── page.tsx                # /contact
│   └── resume/
│       └── page.tsx                # /resume — standalone, outside the morphing shell
│
├── components/
│   ├── layout/                     # Morphing shell and persistent elements
│   │   ├── AppShell.tsx            # Persistent elements only — reads entered from context to animate in
│   │   ├── Nameplate.tsx           # Shared morphing nameplate (layoutId)
│   │   ├── SocialDock.tsx          # Shared morphing social icons (layoutId)
│   │   └── PageNav.tsx             # Persistent navigation element
│   │
│   ├── sections/                   # Full-page content blocks — one file per page
│   │   ├── EnterOverlay.tsx        # Fullscreen "click to enter" overlay
│   │   ├── HeroSection.tsx         # Hero content (tagline, etc.)
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ProjectDetail.tsx       # Content for /projects/[slug]
│   │   └── ContactSection.tsx
│   │
│   └── ui/                         # Reusable primitives (cards, text effects, buttons, etc.)
│
├── context/
│   └── EnterContext.tsx            # Provides `entered` and `setEntered` to the whole app
│
├── lib/
│   ├── animations.ts               # All Framer Motion variants defined here — not inline
│   └── data.ts                     # Projects, links, skills data
│
└── hooks/                          # Custom hooks (scroll, active section, cursor, etc.)
    └── useActiveSection.ts
```

---

## Key Architectural Rules

1. **Centralize animation variants** in `lib/animations.ts`. Never define variants inline
   in components — they should import from the central file.

2. **Keep `'use client'` minimal** — push it down to animated wrapper components only.
   Page-level components should be server components where possible.

3. **Shared morphing elements live in `components/layout/`** and are always mounted via `AppShell`.
   Their position changes via CSS classes driven by the current pathname.

4. **Page content lives in `components/sections/`** — one file per page/view. `AppShell` imports
   and renders the appropriate section based on route or state.

5. **`AnimatePresence mode="wait"`** wraps page content in `AppShell` so exits complete
   before new content enters.

6. **Data lives in `lib/data.ts`** — no hardcoded content scattered across components.

7. **The enter screen is state, not a route.** `EnterOverlay` is conditionally rendered in `AppShell`
   based on local state (or `useEntered` hook). The only exception to the single-app-shell pattern
   is `/resume`, which is a standalone page outside the morphing shell.

---

## What to Preserve Through Changes

Even as specific implementation details evolve, these are the non-negotiables:

- The morphing shared-element transition approach (not slide/fade page swaps)
- A fixed, persistent navigation element of some kind
- Monospace or technical-feeling typography
- Dark aesthetic as the baseline
- All animation variants centralized in one file
