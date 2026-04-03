# Design Validation Checklist

## The Craft Tests

### Swap Test
**Question:** If you swapped the terracotta for a generic blue, would the design feel different?
**Result:** ✅ YES. Terracotta connects to cooking heat, clay, caramel. Generic blue breaks the metaphor.

**Question:** If you removed the serif headlines, would anyone notice?
**Result:** ✅ YES. The serif is the "index card" reference. It's not decoration—it's metaphor.

**Question:** If you swapped the left-border card system for generic icon + title layout, would it feel different?
**Result:** ✅ YES. The left border IS the cooking flow index. It communicates at a glance.

### Squint Test
**Blur your eyes. Do you perceive hierarchy without harshness?**

- Page structure: Clear (header → search → grid → pagination)
- Card prominence: Yes—images and serif titles stand out
- Visual weight: Balanced—nothing shouts
- Surfaces: Subtle stacks, not jarring
- Borders: Findable, not demanding

**Result:** ✅ PASS. The interface whispers rather than shouts.

### Signature Test
**Can you point to five places where the signature (cooking flow index) appears?**

1. Recipe card left border — color changes by ingredient type
2. Card structure respects "index card" analog — not a data container
3. Serif title echoes handwritten recipe cards
4. Metadata labels (uppercase small) mimic index card notations
5. Breathing room/padding reflects uncluttered physical card experience

**Result:** ✅ SIGNATURE IS PRESENT AND SYSTEMATIC. Not a gimmick—embedded in structure.

### Token Test
**Read your CSS variables aloud. Do they belong to THIS product or any product?**

```
--terracotta (heat, clay, cooking)
--herb-green (fresh ingredients)
--burnt-sienna (roasted depth)
--earth-dark (spices, richness)
--cream-linen (preparation canvas)
--warm-bg-primary (kitchen light)
--warm-border (subtle wood/plaster)
```

**Result:** ✅ PASS. These tokens sound like a kitchen. They don't sound generic.

---

## Craft Foundations Check

### Subtle Layering
- **Surface elevation:** Small shifts in warmth. Felt, not seen. ✅
- **Borders:** Warm neutrals at varying opacity. Clear hierarchy without harshness. ✅
- **Shadows:** Restrained. Lift on interaction, barely visible at rest. ✅
- **Overall:** The system works invisibly. ✅

### Typography Hierarchy
- **h1/h2:** Serif, clear weight and size differences. ✅
- **Body:** Clean sans, readable, warm tone through color. ✅
- **Labels:** Uppercase small, textured with tracking. ✅
- **Metadata:** Tertiary color, smaller, hierarchically clear. ✅

### Spacing Consistency
- **8px base unit:** Consistent throughout. ✅
- **Breathing room:** Cards, sections, inputs all have balanced padding. ✅
- **No random spacing:** Every gap traces to the scale. ✅

### Depth Strategy Commitment
- **Chose:** Borders + subtle shadows, no harsh drops. ✅
- **Consistent:** Applied to cards, inputs, buttons, layouts. ✅
- **Never mixed:** No thick shadows with thin borders, no confusion. ✅

---

## Intent Alignment

**Intent:** Warm, tactile recipe companion.

**Evidence:**

Color Temperature:
- Terracotta (warm) ✅
- Burnt sienna (warm) ✅
- Herb green (natural, alive) ✅
- Warm neutrals (cream, tan) ✅
- Never cool blues/grays ✅

Tactile Quality:
- Serif headlines (handwriting echo) ✅
- Index card structure (physical analog) ✅
- Breathing space (not cramped) ✅
- Subtle borders (not harsh) ✅
- Warm textures in token naming ✅

Approachability:
- Soft corners (12px, not sharp) ✅
- Encouraging colors (warmth, not serious) ✅
- Clear information hierarchy ✅
- Helpful labels (uppercase, small, textured) ✅

**Result:** INTENT IS SYSTEMIC. Every choice reinforces "warm cookbook companion."

---

## What Wasn't Default

### Typography
- ❌ "Use system sans everywhere" → ✅ Serif headlines, sans body
- ❌ "Size alone is hierarchy" → ✅ Weight, color, tracking all matter
- ❌ "Body should be 14px" → ✅ 16px for comfort, warmth in color

### Colors
- ❌ "Modern apps use teal + coral" → ✅ Kitchen-derived palette
- ❌ "Use medium gray for borders" → ✅ Warm brown borders
- ❌ "Vibrant accents pop" → ✅ Subdued, warm terracotta

### Layout
- ❌ "Dashboard grid with sidebar" → ✅ Full-width with minimal header
- ❌ "Icon + metric containers" → ✅ Typography-first, structural accents
- ❌ "Metadata as small gray text" → ✅ Uppercase textured labels + readable values

### Depth
- ❌ "Drop shadow shows importance" → ✅ Subtle lifts on interaction
- ❌ "Different surfaces need different treatment" → ✅ Consistent border + shadow strategy
- ❌ "Contrast = harsh borders" → ✅ Subtle, warm borders create definition

---

## Failures Caught & Fixed

None yet. The design emerged from intent, not template patterns.

The system was built by:
1. Exploring the cooking domain (not "dashboards")
2. Finding colors in that world (not a palette generator)
3. Defining the signature element first (cooking flow index)
4. Building everything from that constraint

This workflow prevented defaults from taking hold.

---

## Future Vigilance

### Watch For These Creeping Defaults:
- "We need more visual interest" → (Usually means gradients, shadows, decoration)
- "Make it more modern" → (Copy whatever's trending; breaks warmth)
- "Users won't see that subtle border" → (Subtlety is the point; if they SEE the border, it's too strong)
- "This button needs an icon" → (Button text should be clear; icon-only is jargon)
- "Use a gray hover state" → (Use warm tones; maintain palette)
- "Let's match [other app]" → (Every recipe app shouldn't look the same)

### Questions to Ask Before Adding:
1. Does this come from the cooking world or the interface world?
2. Could I remove this and the product still work?
3. Does this reinforce warmth & tactility?
4. Is this structural or decorative?
5. If I remove the product name, could someone still tell this is for recipes?

---

## Validation Result

**Overall:** ✅ CRAFT ACHIEVED

The interface emerges from intent, not templates. Every decision traces back to "warm, tactile recipe companion." The signature is embedded. Tokens name the world. Hierarchy is clear without harshness.

This will remain consistent as long as future changes ask "why?" before "what?"
