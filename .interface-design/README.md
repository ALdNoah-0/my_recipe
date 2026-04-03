# Recipe Explorer — Interface Redesign Complete

## Overview

The Recipe Explorer interface has been completely redesigned from the ground up around a single core principle: **warm, tactile recipe companion**.

Every color, every type choice, every spacing decision traces back to this intent. This is not a generic dashboard redesigned with cosmetic changes—it's a purposeful system built from the cooking domain.

---

## What Changed

### Color Palette
**From:** Generic teal + coral gradient
**To:** Kitchen-derived palette

- **Terracotta (#D9704C)** — Primary interactive color, action buttons, hover states. The heat of cooking, clay pots, wooden serving boards.
- **Earth Dark (#3D2D1F)** — Deep emphasis, recipe titles. The darkness of spices, caramel, richness in ingredients.
- **Herb Green (#6BA876)** — Card accents, ingredient signals. Fresh basil, parsley, the living ingredient.
- **Burnt Sienna (#A54226)** — Deep action state, roasted context. Vegetables at the edge of caramelization.
- **Cream Linen (#F5F0E8)** — Warm canvas. Preparation surfaces, linen tablecloths, unfinished warmth.

**Warm Neutrals:** All grays were replaced with warm taupes and creams. No cool blues sneaking in. Borders use warm brown at controlled opacity.

### Typography
**From:** Generic sans-serif everything
**To:** Serif + sans conversation

- **Serif (Georgia, Garamond)** used for headlines (h1, h2) and recipe card titles. Echoes the index card tradition—handwritten feeling, warmth.
- **Sans-serif (system fonts)** for body and functional text. Contemporary, readable.
- **Weight as hierarchy:** Bold serif headlines, medium sans for supporting text, light for metadata.
- **Spacing & tracking:** Letter-spacing adds texture to labels (uppercase small text becomes readable and intentional, not squeezed).

### Card Structure
**From:** Generic "image + title + button" layout
**To:** Cooking Flow Index (signature element)

Recipe cards now feature:
- **Left border stripe (4px)** that changes color by ingredient category/complexity
  - Herb green: Quick, lighter recipes
  - Burnt sienna: Protein-heavy, complex
  - Earth dark: Multi-step, involved
- **Serif title** (18px, 700 weight) for immediate personality
- **Metadata section** with category — uppercase label (11px, 0.5px tracking) + readable value (15px, medium weight)
- **Care with space** — not cramped. Cards breathe.

The card's structure and colors tell you something before you read a word. This is design.

### Buttons & Controls
**From:** Bright solid colors, sharp edges
**To:** Warm, conversational interactions

- **Search input:** 12px radius (inviting, not technical), 2px warm border that becomes terracotta on focus
- **Buttons:** Warm surface background with warm borders by default. On hover/action: terracotta background, warm surface text. On active: burnt sienna.
- **Pagination:** Clear active state (terracotta bg + white text), subtle unselected state. Numbers responsive, not overwhelming.
- **Clear button (✕):** Warm color, scales up on hover—interactive, helpful, not harsh.

### Spacing
**From:** Random padding/margins
**To:** 8px base unit system

Every spacing value is a multiple of 8px:
- `--space-xs` (4px) — icon gaps
- `--space-sm` (8px) — button internals
- `--space-md` (16px) — standard padding
- `--space-lg` (24px) — section spacing, breathing
- `--space-xl` (32px) — major separations
- `--space-2xl` (48px) — hero spacing

This creates invisible rhythm. Components feel balanced without looking engineered.

### Depth
**From:** Heavy drop shadows, harsh borders, color-fragmented layout
**To:** Subtle layering, warm-toned borders, unified background

- **Surfaces** stack subtly—difference in lightness is 3-5%. You feel it, don't see it.
- **Borders** use warm brown at varying opacity (15% for standard, 25% for emphasis). Never harsh black or cool gray.
- **Shadows** are barely visible at rest (0 1px 3px @ 8% opacity), lift slightly on hover. No drama.
- **No sidebar** — main content and header share the same warm background. A border only indicates separation where needed.

---

## Design Principles That Hold It Together

### Token Architecture
Every color, every spacing value, every font choice traces to a primitive set:
- **Palette primitives:** Foreground (text hierarchy), background (elevation), border (separation), brand (terracotta), semantic (success, warning, error)
- **Text hierarchy:** Primary (body), secondary (supporting), tertiary (metadata), muted (disabled)
- **Spacing scale:** Single base unit, consistent throughout
- **Depth:** One strategy (borders + subtle shadows), applied everywhere

### Signature Element: Cooking Flow Index
The left border on recipe cards serves multiple purposes:
1. **Visual signal** — Color tells you ingredient category at a glance
2. **Structural coherence** — Consistent across all cards
3. **Metaphor reinforcement** — Index cards have colored tabs; this echoes that tradition
4. **Meaningful, not decorative** — The border communicates information, not just aesthetic

This element couldn't exist in a generic dashboard. It's specific to this product's world.

### No Defaults Allowed
Every decision was questioned:

| Question | Answer | Result |
|----------|--------|--------|
| Why terracotta? | Heat, cooking, clay, natural warmth | It belongs here, nowhere else |
| Why serif headlines? | Index card tradition, handwritten feel | Creates warmth and personality |
| Why border on the left? | Physical recipe cards have colored tabs | Structural, meaningful, not decorative |
| Why warm grays? | Cool grays break the kitchen metaphor | Every token reinforces the world |
| Why 8px base unit? | Breathing room, not cramped | Feels handmade, not templated |

If the answer was "it's common" or "it's modern," we didn't use it.

---

## What This Means for Future Work

### Consistency Checkpoint
Before adding any new component or feature:

1. **Does this color come from the palette?** (Not a random hex)
2. **Does the typography follow hierarchy?** (Serif headlines, sans body, weight for emphasis)
3. **Is spacing a multiple of 8px?** (Never random padding)
4. **Does this reinforce "warm cookbook companion"?** (Or does it feel generic?)
5. **Could I remove this and the product still work?** (If not, it's just decoration)

### Token Naming
Tokens should name the world, not describe CSS:
- ✅ `--terracotta`, `--herb-green`, `--warm-surface`
- ❌ `--primary`, `--gray-700`, `--color-1`

Someone reading your CSS variables should know this is a recipe app.

---

## The Experience

When you open the app now:

1. **Header:** Warm cream background with a subtle terracotta accent line. Serif headline that feels like a cookbook cover.
2. **Search:** Inviting input with warm border, scales up on focus. Clear button (✕) is warm and helpful, not harsh.
3. **Grid:** Recipe cards with left-border color stripes. Images are the invitation. Serif titles set the tone. Metadata labels are textured and small.
4. **Pagination:** Warm buttons and page numbers. Active state is clear terracotta. You always know where you are.
5. **Detail page:** Two-column layout. Large, serif recipe title. Ingredients highlighted with green left borders (herb signal). Instructions flow in a warm box with left border accent. Video button is warm terracotta.

Everything whispers instead of shouts. Hierarchy is clear but subtle. The interface feels like it came from a kitchen, not generated by an AI.

---

## Files Saved for Consistency

`.interface-design/system.md` 
Contains: Domain exploration, color palette, typography system, spacing scale, component patterns, token architecture, future consistency guidelines.

`.interface-design/validation.md`
Contains: Design critique checklist, craft tests (swap, squint, signature, token), validation of intent alignment, what wasn't defaulted.

These documents ensure future changes maintain this warm, intentional approach. They answer "why" before "what."

---

## Summary

**Old Design:** Generic react dashboard template, strong color contrast, gradient headers, off-the-shelf component library feel.

**New Design:** Warm craft system built from the cooking domain. Every color, type choice, and spacing decision has a reason. The interface feels like it could only ever be a recipe app.

This is the difference between design and templates. This is craft.
