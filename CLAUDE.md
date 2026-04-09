# Portfolio — Project Overview

This is a personal portfolio for a full-stack software engineer. The goal is a visually
distinctive, animated portfolio that feels crafted — not templated.

---

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` for token bridging)
- **Animation:** Framer Motion
- **Fonts:** Stratum No. 2 (custom OTF, 3 weights: 300/400/700) loaded from `src/fonts/`
- **Deployment:** Vercel

---

## Core Design Concept

The portfolio is built around a **CS:GO case-opening** metaphor. When you first arrive, you're
presented with a weapon case. Clicking it spins a CS:GO-style reel of cards. Embedded in the
reel are three "special cards" — the actual UI widgets of the site (Social Dock, Picture Frame,
Nav Dock). After the reel stops, those cards physically fly out of the reel and land in their
fixed positions on the hero page. The site's UI is the loot you just unboxed.

Each special card is assigned a random CS:GO rarity tier (blue → purple → pink → red → gold)
during the spin. That rarity color becomes the accent color for that widget — underlines, borders,
indicator bars — and persists for the session.

After this initial entry morph, **SocialDock and NavDock remain fixed** at their hero positions.
They do not reposition between pages. The **PictureFrame** is the one persistent element that
*does* morph — repositioning as the user navigates between pages.

The aesthetic direction is **creative, smooth, and vibrant** — lively animations, a rich color
palette drawn from CS:GO rarity tiers, and custom display typography. The site exists in both a
dark and a light version (dark as the baseline; light fully supported via `prefers-color-scheme`),
with each mode having its own tuned background, glow, and lettering colors. It should feel alive
and handcrafted — expressive, not sterile.

---

## Entry Phase State Machine

The entire enter experience is driven by a phase enum managed in `EnterContext`:

```
idle → spinning → completed
```

- **`idle`** — `EnterOverlay` is shown. A CS:GO weapon case sits center-screen with an animated
  glow. A key-shaped custom cursor appears on hover. Cycling typewriter hint text plays ("click
  the case to enter", etc.). Clicking calls `setPhase('spinning')`.

- **`spinning`** — `CaseSpinSection` renders a horizontal reel of cards with a custom
  deceleration ease. Three special cards (`pictureframe`, `socialdock`, `nav`) are embedded at
  fixed positions in the reel, each rolled to a random CS:GO rarity via `weightedRandom()`. When
  the spin completes, it measures the DOMRect of each special card slot and saves all rects and
  rarity colors to context, then advances to `completed`.

- **`completed`** — `EnterOverlay` and `CaseSpinSection` unmount. `AppShell` renders the three
  `MorphCard` wrappers, which animate from their reel slot positions to their fixed hero positions.
  The hero page content fades in.

---

## The MorphCard System

`MorphCard.tsx` is the core animation primitive for the post-spin morph. It:

1. Reads `cardSlotRects[type]` from context — the DOMRect of that card in the spin reel
2. Sets `initial` to the reel card's viewport position, reel card dimensions, and dark card background
3. Animates to its hero position, natural content size, and a transparent background
4. Uses spring physics for position/size and a tween for the background color fade
5. Removes `overflow-hidden` via a `done` flag once the animation completes

Specific spring and timing values are intentionally tweakable and should not be treated as fixed.

This creates the illusion that the UI widgets literally fly out of the case reel and become
the site's interface.

---

## Pages & Sections

### `/` — Hero (the main page)
The landing page and "home base." After the case spin, this is what the user lands on. The About
content will be absorbed directly into this page rather than existing as a separate route — bio,
skills, and personality all live here as the user scrolls.

Implemented so far:
- `EnterOverlay.tsx` — case opening entry screen
- `CaseSpinSection.tsx` — CS:GO-style reel animation
- `HeroSection.tsx` — stub, to be built out with full hero + absorbed about content

### `/projects` — Projects *(planned)*
A collection of work with a project detail view at `/projects/[slug]`. Not yet built.

### `/contact` — Contact *(planned)*
Simple contact section. Not yet built.

### `/resume`
A direct link to `/assets/resume.pdf` from the Social Dock. Not a rendered route.

---

## Persistent Shell Elements

These live in `components/layout/` and are always mounted via `AppShell` once
`phase === 'completed'`.

### Fixed after entry morph (do not reposition between pages):
- **`SocialDock.tsx`** — Social links (GitHub, LinkedIn, Resume). Each icon has a spring-powered
  hover scale + rarity-color accent underline bar. Fixed at top-left in the hero layout.
- **`NavDock.tsx`** — Navigation links (Home, Projects, Contact). Active route gets a
  rarity-colored underline indicator that animates in. Fixed at top-right in the hero layout.

### Morphs between pages:
- **`PictureFrame.tsx`** — Portrait photo with a rarity-colored border that clips in on entry.
  This element *does* reposition as the user navigates between pages using Framer Motion
  `layoutId` or equivalent.

### The morph container:
- **`MorphCard.tsx`** — Wraps each widget. Handles the post-spin fly-in animation from the
  reel slot to the hero position.

---

## Rarity Color System

During the spin, each special card is assigned a CS:GO rarity tier. After the spin:

1. `specialCardsRarities: Record<SpecialCardType, string>` is stored in context (maps type → color hex/var)
2. Each widget receives its `rarityColor` as a prop from `AppShell`
3. The color is used as an accent: underline bars (`SocialDock`, `NavDock`), border (`PictureFrame`)
4. Colors are defined as CSS custom properties: `--cs-blue`, `--cs-purple`, `--cs-pink`, `--cs-red`, `--cs-gold`

Rarity weights mirror CS:GO: blue 79.92%, purple ~16%, pink ~3.2%, red ~0.64%, gold ~0.26%.

---

## CSS Design Tokens (`globals.css`)

```css
/* CS:GO rarity colors */
--cs-gold:   #FFE500
--cs-red:    #EB4B4B
--cs-pink:   #D32CE6
--cs-purple: #8847FF
--cs-blue:   #4B69FF

/* UI colors (light/dark scheme aware) */
--background, --foreground, --case-glow, --enter-lettering
```

All tokens are bridged into Tailwind via `@theme inline` so they're available as utility classes
(`bg-case-glow`, `text-enter-lettering`, `text-cs-gold`, etc.).

---

## Data Files

- **`lib/data.ts`** — `SOCIAL_LINKS` and `NAV_LINKS`. Email link is commented out pending
  contact section decision.
- **`lib/skinData.ts`** — `SpecialCardType`, `RarityId`, `RARITY_COLORS`, `Card` type,
  `FILLER_SKINS` (reel filler images per rarity), `SPECIAL_CARDS` (the three special cards
  embedded in the reel: `pictureframe`, `socialdock`, `nav`).

---

## Animation Philosophy

- The entry experience is the main "wow" moment — the case spin and post-spin morph should
  feel weighty and deliberate
- Spring physics for all positional animation (feels physical, not mechanical)
- Easing standard: `[0.22, 1, 0.36, 1]` (expo-out feel) for tweens; `[0.05, 1, 0.2, 1]`
  for the reel spin deceleration
- All Framer Motion variants live in `lib/animations.ts` — not inline in components
- Exception: `MorphCard` uses inline animation values since they are computed from runtime
  measurements (DOMRects) and cannot be predefined as static variants

---

## Project Structure (Actual)

```
src/
├── app/
│   ├── globals.css             # Design tokens, font-face declarations, Tailwind bridge
│   ├── layout.tsx              # Root layout — wraps app in EnterProvider, mounts AppShell
│   └── page.tsx                # / — orchestrates idle/spinning/completed phases
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx        # Mounts MorphCard+widget tree when phase === 'completed'
│   │   ├── MorphCard.tsx       # Post-spin fly-in animation primitive
│   │   ├── SocialDock.tsx      # Social links — fixed post-morph, rarity accent underline
│   │   ├── NavDock.tsx         # Nav links — fixed post-morph, active route rarity indicator
│   │   └── PictureFrame.tsx    # Portrait — morphs between page positions, rarity border
│   │
│   └── sections/
│       ├── EnterOverlay.tsx    # CS:GO case + key cursor + typewriter hint (idle phase)
│       ├── CaseSpinSection.tsx # 60-card reel with embedded special cards (spinning phase)
│       └── HeroSection.tsx     # Hero + about content stub (completed phase)
│
├── context/
│   └── EnterContext.tsx        # Phase state machine + rarity/rect data; exposes usePhase()
│
├── fonts/
│   ├── stratumno2_bold.otf
│   ├── stratumno2_regular.otf
│   └── stratumno2_light.otf
│
└── lib/
    ├── animations.ts           # Framer Motion variants (enterOverlayVariants, heroVariants,
    │                           # appShellVariants, reelSpinEasing)
    ├── data.ts                 # SOCIAL_LINKS, NAV_LINKS
    └── skinData.ts             # SpecialCardType, RarityId, RARITY_COLORS, FILLER_SKINS,
                                # SPECIAL_CARDS
```

---

## Key Architectural Rules

1. **Centralize animation variants** in `lib/animations.ts`. Never define variants inline in
   components — import from the central file. Exception: `MorphCard`, which uses runtime-computed
   values that cannot be static variants.

2. **Keep `'use client'` minimal** — push it down to animated/interactive components only.

3. **`AppShell` only renders its children when `phase === 'completed'`** — it reads phase from
   context and is responsible for the widget layout after the entry experience.

4. **Widget positioning in AppShell is hardcoded** (`heroTop`, `heroLeft` pixel values passed to
   `MorphCard`). This is intentional for the entry morph — the widgets land at fixed positions and
   `SocialDock`/`NavDock` stay there. Only `PictureFrame` will be repositioned per-route later.

5. **Data lives in `lib/data.ts` and `lib/skinData.ts`** — no hardcoded content in components.

6. **The enter screen is state, not a route.** All three phases (`idle`, `spinning`, `completed`)
   render within `/` via `AnimatePresence`. There is no separate `/enter` route.

---

## What to Preserve Through Changes

- The CS:GO case-opening entry experience — this is the defining creative concept
- The post-spin card morph: widgets fly from the reel to their hero positions
- The rarity color accent system — each widget's accent is determined by its spin result
- `PictureFrame` as the one element that continues to morph between pages post-entry
- Stratum No. 2 typography for display text
- Dark aesthetic as the baseline (light mode supported but secondary)
- All animation variants centralized in `lib/animations.ts`
