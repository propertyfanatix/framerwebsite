# Framer Brand System — Visual Source of Truth

**Status:** This document records the existing Shalinthia.com August 2026 Rebuild. Manually verified values in this file are the source of truth. Do not replace the visual identity with a new palette, font pairing, template, or component system.

## Brand preservation rule

Reuse existing Framer text styles, colors, Navigation, buttons, typography, logo, spacing patterns, and visual hierarchy whenever an existing style or component can accomplish the job.

- Do not redesign the site into a generic template.
- Do not replace the editorial serif + sans-serif + script-logo hierarchy.
- Do not introduce new fonts or colors without explicit approval.
- Any value not listed as verified below must remain: **[READ FROM CURRENT FRAMER SITE]**.

## Existing color system — VERIFIED

| Name | Exact value |
| --- | --- |
| Ivory | `rgb(246, 243, 238)` |
| Ink | `rgb(36, 34, 31)` |
| Oxblood | `rgb(94, 0, 0)` |
| Stone | `rgb(220, 214, 204)` |

Do not introduce a replacement color palette.

## Existing typography — VERIFIED

- Editorial serif: Cormorant Garamond
- Sans-serif: Inter
- Script-logo treatment: preserve the existing logo exactly.

## Navigation — VERIFIED-MANUAL

### Existing component

**Navigation**

### Existing Framer text style

**Navigation Link**

### Typography

- Font: Inter
- Weight: Semibold
- Size: 11px
- Letter spacing: 1.2px
- Line height: 1.2em
- Color: `#000000`
- Alignment: Left
- Treatment: Uppercase

### Structure

- Shalinthia Miles logo on the left
- Navigation links on the right

**Rule:** Preserve the existing Navigation component. Do not recreate or redesign it.

## Primary hero headline — VERIFIED-MANUAL

### Existing Framer text style

**H1 — Display (L)**

### Semantic and layout settings

- HTML tag: `h1`
- Alignment: Left
- Text balance: Yes

**Rule:** Use the existing H1 — Display (L) Framer style for major desktop hero headlines. Do not recreate, replace, or infer its underlying typography.

## Body copy — VERIFIED-MANUAL

### Existing Framer text style

**Body**

### Semantic and layout settings

- HTML tag: `p`
- Alignment: Left
- Text balance: Yes

**Rule:** Use the existing Body style for standard paragraph copy. Do not recreate or substitute its typography.

## Primary CTA — VERIFIED-MANUAL

### Existing visual treatment

- Oxblood background
- White uppercase text

### Existing button layout

- Stack
- Horizontal direction
- Center distribution
- Center alignment
- No wrapping
- Gap: 0
- Padding: 14px top, 20px right, 14px bottom, 20px left
- Height: 41px / Fit

### Rule

Preserve this existing primary CTA treatment. The button words may change for the page purpose, but the component should not be redesigned when the wording changes.

Examples of approved button wording include:

- SEE IF YOUR PROPERTY QUALIFIES
- BOOK A CONSULTATION
- EXPLORE THE BLUEPRINT

## Previously read Framer values — VERIFIED

These values were read directly from the current Framer project before this manual verification:

- Saved color tokens: Ivory, Ink, Oxblood, and Stone, listed above.
- Other observed homepage values: white `#FFFFFF`; soft card fill `#F4F1EA`; card border `1px solid #D9D3C7`; Body text color `#6A655E`.
- Existing Headshot treatment: 92px × 92px with 100% radius.
- Existing AmbientHeroVideo instance: 44% width, 297px height, 1.78 aspect ratio.

These are observations of existing instances, not permission to apply them as new universal design rules.

## Remaining visual values — MANUAL

Keep each of these marked **[READ FROM CURRENT FRAMER SITE]** until it is verified manually:

- Heading styles other than H1 — Display (L)
- Button border radius and secondary-button treatment
- Global card radius, padding, grid gap, and image treatment
- Global section spacing and mobile spacing
- Content width and mobile page padding
- Header styling beyond the verified Navigation component
- Footer styling
- My Promise styling
- Brooklyn 60-Day Seller Success Blueprint feature and timeline styling
- General Reel/video placeholder styling

## Implementation rule

When building any page, first look for the matching existing Framer style or component. Use it unchanged whenever it fits the approved content. Read any missing visual value from the current Framer site before applying it.
