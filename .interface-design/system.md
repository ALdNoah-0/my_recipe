# Recipe Explorer Design System

## Intent & Philosophy

**Product:** Warm, tactile recipe companion for home cooks discovering and planning meals.

**User:** Home cook at kitchen table on Sunday planning the week, or at 5pm deciding what's for dinner. Not a professional chef. Someone who wants to understand what they're making before committing.

**Feel:** Warm like a physical cookbook. Tactile like holding an index card with handwritten notes. Approachable, encouraging, not intimidating.

---

## Domain Territory

Concepts from the recipe/cooking world that inform every design decision:

1. **Discovery through visual language** — You pick recipes partly by how they look. The image is the invitation.
2. **Ingredients as story** — What makes a recipe special is what goes in. Ingredients deserve prominence.
3. **Hands-on craft** — Cooking is skill building. Difficulty and time inform the decision to attempt.
4. **Index card tradition** — Real recipes live on physical cards, with handwriting, notes, creases. Tactile quality means something.
5. **Ritual and rhythm** — Cooking happens in phases: prep, cook, rest. UI should respect that flow.

---

## Color Palette

**Origin:** Colors that naturally exist in kitchens and food.

| Token | Hex | Purpose | Why |
|-------|-----|---------|-----|
| `--terracotta` | `#D9704C` | Primary action, hover states, interactive emphasis | Heat of cooking, clay pots, wooden boards |
| `--earth-dark` | `#3D2D1F` | Deep text, strongest emphasis | Spices, caramel, cooked depth |
| `--herb-green` | `#6BA876` | Card accents, secondary emphasis, ingredient highlight | Fresh basil, parsley, living ingredients |
| `--burnt-sienna` | `#A54226` | Dark action state, roasted context | Roasted vegetables, caramelized depth |
| `--cream-linen` | `#F5F0E8` | Premium surfaces, special emphasis | Canvas, preparation surfaces, linen |

**Warm Neutrals (never cool grays):**

| Token | Hex | Purpose |
|-------|-----|---------|
| `--warm-bg-primary` | `#FAF8F5` | Page background |
| `--warm-bg-secondary` | `#F3EEE8` | Secondary surfaces, metadata backgrounds |
| `--warm-surface` | `#FFFFFF` | Primary card/surface color |
| `--warm-border` | `rgba(139, 115, 85, 0.15)` | Subtle separation, standard border |
| `--warm-border-strong` | `rgba(139, 115, 85, 0.25)` | Emphasis border, focus indicator |

**Text Hierarchy:**

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#2B1F14` | Body text, headlines |
| `--text-secondary` | `#5D4A3A` | Supporting text, descriptions |
| `--text-tertiary` | `#8B7355` | Metadata, labels, small text |
| `--text-muted` | `#A89680` | Disabled, low emphasis hints |

---

## Signature Element: Cooking Flow Index

**Definition:** Recipe cards communicate complexity through structure, not decoration.

**Implementation:**
- **Left border color** signals ingredient category (herb-green for lighter/veg, burnt-sienna for proteins, earth-dark for complex)
- **Border weight**: Always 4px — consistent, not thin/thick variance
- **Card anatomy**: Image, Title (serif), Metadata (category), Button last
- **Breathing**: Comfortable padding. Recipes aren't cramped.

**Why it works:**
- Glanceable: you read the card's "personality" before reading a word
- Physical metaphor: index cards have colored tabs — we use colored edges
- Consistent: all cards follow same structure, but color stripe changes meaning
- Structural, not decorative: this IS the design, not applied on top

---

## Typography System

**Principle:** Weight and choice matter as much as size.

### Serif (Georgia, Garamond for headlines)
- **h1:** 32px, 700, -0.5px tracking — Warm, welcoming entry
- **h2:** 24px, 700, -0.3px tracking — Subsection authority
- Recipe card titles: 18px, 700 — Index card feel

### Sans-serif (System fonts for body)
- **Body (p):** 16px, 400 — Readable, neutral
- **Small/labels:** 13px, 500 — Metadata clarity
- **Uppercase labels:** 11px, 600, 0.5px tracking — Hierarchical emphasis

**Why this mix:**
Serif in headlines evokes the recipe card tradition. Sans body ensures contemporary readability. The combination feels "notebook" — warm + clear.

---

## Depth Strategy

**Approach:** Subtle borders + warm surface elevations. No harsh shadows.

**Principle:** Hierarchy emerges through whisper-quiet shifts. Nothing jumps out.

### Surface Elevation
- Base (page): `--warm-bg-primary` (slightly warm)
- Secondary (cards, sidebars): `--warm-surface` (white-ish)
- Tertiary (metadata, inputs): `--warm-bg-secondary` (slightly warmer than base)

The shifts are small. You feel them rather than see them.

### Borders
- **Standard:** `--warm-border` (15% opacity) — Subtle separation
- **Strong:** `--warm-border-strong` (25% opacity) — Emphasis, focus
- **Semantic:** Left borders on cards are full opacity (4px for presence)

Never use harsh black/gray borders. All borders use warm neutrals — they belong to the world, not the interface.

### Shadows
- **Subtle:** `0 1px 3px rgba(0, 0, 0, 0.08)` — Barely visible, keeps air
- **Hover:** `0 8px 16px rgba(61, 45, 31, 0.12)` — Lift on interaction
- **Philosophy:** If you notice the shadow, it's too strong

---

## Spacing Scale

Base unit: 8px (multiples used consistently)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon gaps, micro separations |
| `--space-sm` | 8px | Button internals, tight spacing |
| `--space-md` | 16px | Component padding, standard |
| `--space-lg` | 24px | Section padding, breathing |
| `--space-xl` | 32px | Major separations |
| `--space-2xl` | 48px | Hero spacing, page sections |

**Padding approach:** Always symmetrical. Padding defines breathing room, never visual hierarchy tricks.

---

## Component Patterns

### Recipe Cards
- **Layout:** Image / Title (serif) / Metadata / Button
- **Left border:** 4px solid (color by ingredient category)
- **Padding:** 16px interior
- **Radius:** 8px (medium — not sharp, not soft)
- **Hover:** Translate up 6px, increase shadow subtly
- **Metadata:** Small labels (11px, uppercase) above values (15px)

### Search Input
- **Border:** 2px solid `--warm-border-strong`
- **Radius:** 12px (larger — inviting, not technical)
- **Focus:** Border shifts to `--terracotta`, subtle inner box-shadow
- **Padding:** 16px (breathing room for typing)

### Buttons
- **State system:** default / hover / active / disabled
- **Action button:** Terracotta background, warm surface text
- **Secondary button:** Warm surface background, warm border, text is primary
- **Disabled:** Opacity 40%, no pointer

### Pagination
- **Inactive number:** Warm surface background + border
- **Active number:** Terracotta background + white text
- **Prev/Next buttons:** Warm surface w/ border, hover lifts
- **Info text:** 13px, uppercase, 0.3px tracking — metadata style

---

## What This Replaces

| Old Default | Problem | New Choice |
|---|---|---|
| Cool teal + coral gradient | Generic, "every app" | Warm terracotta + earthy neutrals |
| Sidebar (separate color) | Fragments space | Minimal header, same background throughout |
| Icon-heavy metric cards | Jargon-focused | Simple label + value, typography-first |
| Cool gray (#999, #ddd) | Feels corporate | Warm browns (rgb values with brown tone) |
| Standard sans everywhere | No personality | Serif headlines + sans body |
| Thick, dark borders | Harsh, mechanical | Subtle warm borders, meaningful color stripes |
| Big drop shadows | Floating feeling | Slight lift on hover, subtle depth |

---

## Consistency Checks

### Before Adding Any Component
- [ ] Does the color come from the palette?
- [ ] Does the spacing use the scale?
- [ ] Does the border weight match strategy (subtle vs emphasis)?
- [ ] Is typography hierarchy clear (size + weight + color)?
- [ ] Does this feel like a cookbook companion, not a dashboard?

### Token Naming
All tokens should evoke the product's world. Examples:
- ✅ `--terracotta`, `--herb-green`, `--warm-surface`
- ❌ `--gray-700`, `--color-primary`, `--surface-2`

Token names tell the story. Someone reading the CSS variables should know this is a recipe app.

---

## Future Consistency

When adding new features:

1. **Check this file first** — Is there a pattern for this?
2. **Use established tokens** — Don't invent new colors/spacing
3. **Follow the hierarchy** — Serif headlines, sans body, warm palette
4. **Question decoration** — If it's only visual, it doesn't belong
5. **Test warmth** — Does this feel like the product, or like a template?

The moment you stop asking "why this color?" is the moment defaults creep back in.

---

## Color Inspection

Read the tokens aloud. Do they sound like a recipe app?

✅ Terracotta, herb green, burnt sienna, cream linen, earth dark
❌ Blue, red, primary, secondary, gray-700

This is the test. Tokens name the world you're building.
