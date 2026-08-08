# Homepage Framer Build Instructions

**Copy source:** `content/core-pages/HOME.md`  
**Visual source:** `implementation-notes/FRAMER_BRAND_SYSTEM.md`

## Non-negotiable setup

1. Copy every word from `HOME.md` exactly. Do not rewrite the approved homepage copy.
2. Reuse the existing **Navigation** component, including the existing **Navigation Link** style.
3. Use the existing **H1 — Display (L)** style for the Hero headline.
4. Use the existing **Body** style for standard paragraph copy.
5. Reuse the existing primary CTA treatment whenever a primary CTA is called for.
6. Do not create replacement colors, fonts, buttons, navigation, or generic visual components.
7. For any unknown visual setting, read the current Framer site first. Do not guess.

## Global page elements

### Navigation

- **Create:** Nothing new; place the existing Navigation component.
- **Use:** Existing Navigation component and Navigation Link style.
- **Desktop:** Logo left; links right.
- **Mobile:** Use the existing mobile navigation behavior.
- **Reusable:** Yes; use the existing component only.
- **Reel/video:** No.

### Footer

- **Create:** Nothing new; place the existing Footer component.
- **Use:** Existing Footer styling and logo treatment.
- **Copy:** Add the approved identity, navigation, brokerage, and compliance copy from the Footer section of `HOME.md` without rewriting it.
- **Reusable:** Yes; use the existing component only.
- **Reel/video:** No.

## 1. Hero

1. **Create:** A Hero section using a Frame with two child Stacks: copy and image.
2. **Use:** Frame, Stack, Text, Image. No Code Component.
3. **Desktop:** Keep the existing two-column hero structure. Copy sits left; image sits right.
4. **Mobile:** Use a single vertical Stack: copy first, image second.
5. **Width:** Reuse the existing homepage section/container width.
6. **Alignment:** Left-align the copy; use the existing hero alignment for the image.
7. **Spacing:** Reuse the current hero spacing pattern.
8. **Text style:** Hero headline uses **H1 — Display (L)**. Supporting paragraphs use **Body**.
9. **Background:** Reuse the current hero surface.
10. **Image placement:** Use Shalinthia’s real headshot or an authentic Brooklyn home image on the right desktop column.
11. **Button style:** Existing primary CTA treatment.
12. **Button destination:** `/brooklyn-60-day-seller-success-blueprint/qualification`.
13. **Reel/video:** No.
14. **Reusable component:** No; this is the homepage Hero.

## 2. Four-Question Seller Guide

1. **Create:** A dedicated section with an introduction Stack, quiz progress indicator, answer cards, and a result card.
2. **Use:** Frame, Stack, Text, and reusable Components. Use a Code Component only for the recommendation logic and routing.
3. **Desktop:** Keep the introduction above a contained quiz area. Present one question at a time.
4. **Mobile:** One-column answer cards with the progress indicator above the question.
5. **Width:** Reuse the current content-container width; read the quiz-panel width from the current site if one exists.
6. **Alignment:** Center the introduction; left-align question and answer copy.
7. **Spacing:** Reuse existing card and section spacing patterns.
8. **Text style:** Section heading uses the matching existing section-heading style; all paragraph copy uses **Body**.
9. **Background:** Use an existing soft neutral surface from the current site.
10. **Image placement:** None.
11. **Button style:** Existing primary CTA for the introductory button; existing answer-card styling for answers.
12. **Button destination:** `#seller-guide` for the introduction button. Results use the destinations listed in `HOME.md`.
13. **Reel/video:** No.
14. **Reusable component:** Yes: Quiz Progress, Quiz Answer Card, and Recommendation Card.

## 3. Why Homeowners Work With Shalinthia

1. **Create:** A section with an introduction Stack, three supporting-point cards, and an optional image.
2. **Use:** Frame, Stack, Grid, Text, Image, and a reusable supporting-point Card.
3. **Desktop:** Keep the copy and supporting cards in the existing homepage content pattern.
4. **Mobile:** Stack the cards one per row beneath the copy.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Left-align all copy.
7. **Spacing:** Reuse the existing card-grid and section spacing.
8. **Text style:** Existing section-heading style for the heading; **Body** for paragraphs; matching existing card-title style for supporting points.
9. **Background:** Reuse a current page surface.
10. **Image placement:** Use a candid professional Brooklyn photo of Shalinthia only if the existing layout supports it.
11. **Button style:** Existing primary CTA treatment.
12. **Button destination:** `/my-process`.
13. **Reel/video:** Optional later; not needed for the initial build.
14. **Reusable component:** Yes, for the supporting-point card.

## 4. My Promise

1. **Create:** Use the existing My Promise component when it is available; otherwise create one reusable text-led block only after reading its styling from the current site.
2. **Use:** Component, Frame, Stack, and Text.
3. **Desktop:** Preserve the existing editorial content-block pattern.
4. **Mobile:** Keep it as one vertical content block.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Reuse the current My Promise alignment.
7. **Spacing:** Read from the current Framer site.
8. **Text style:** Matching existing section-heading style and **Body**.
9. **Background:** Read from the current Framer site.
10. **Image placement:** Only if the current My Promise component already includes imagery.
11. **Button style:** Existing secondary or text-link style.
12. **Button destination:** `/my-promise`.
13. **Reel/video:** No.
14. **Reusable component:** Yes.

## 5. Brooklyn 60-Day Seller Success Blueprint Preview

1. **Create:** A feature section with an introductory Stack, three pillar cards, a simple timeline cue, and the approved compliance text.
2. **Use:** Frame, Stack, Grid, Text, and reusable Pillar Card and Program Compliance Block components. No Code Component.
3. **Desktop:** Introductory copy followed by three pillar cards in the existing card-grid pattern.
4. **Mobile:** One vertical Stack: copy, cards, timeline cue, then compliance text.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Left-align copy; align cards according to the existing card component.
7. **Spacing:** Reuse the existing section and card spacing patterns.
8. **Text style:** Matching existing section-heading style, **Body**, and matching existing card-title style.
9. **Background:** Read the current Blueprint-feature styling from Framer before applying it.
10. **Image placement:** Use an authentic Brooklyn home exterior or an existing-style strategy diagram.
11. **Button style:** Existing primary CTA treatment.
12. **Button destination:** `/brooklyn-60-day-seller-success-blueprint`.
13. **Reel/video:** Reserve an optional placeholder only; do not add live video at first build.
14. **Reusable component:** Yes: Pillar Card and Program Compliance Block.

## 6. Featured Neighborhoods

1. **Create:** A section with a heading Stack and three Neighborhood Cards.
2. **Use:** Frame, Stack, Grid, Component, Image, and Text.
3. **Desktop:** Three cards in the current card-grid pattern.
4. **Mobile:** One card per row.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Left-align card copy; preserve the existing card-button placement.
7. **Spacing:** Reuse existing card-grid spacing.
8. **Text style:** Matching existing section-heading style, **Body**, and current card-title style.
9. **Background:** Reuse current related-content or card-grid treatment.
10. **Image placement:** Use authentic neighborhood streetscapes or home exteriors at the top of each card.
11. **Button style:** Existing compact card-button or text-link style.
12. **Button destination:** Use the three neighborhood destinations in `HOME.md` exactly.
13. **Reel/video:** No.
14. **Reusable component:** Yes: Neighborhood Card.

## 7. Seller Guidance

1. **Create:** A section with a heading Stack, three Related Content Cards, and a section CTA.
2. **Use:** Frame, Stack, Grid, Component, Text, and optional Image.
3. **Desktop:** Three cards in the current card-grid pattern, with the section CTA beneath.
4. **Mobile:** One card per row, then the section CTA.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Left-align all copy.
7. **Spacing:** Reuse existing related-content spacing.
8. **Text style:** Matching existing section-heading style, **Body**, and current card-title style.
9. **Background:** Reuse a current page or related-content surface.
10. **Image placement:** Use images only if the existing related-content card includes them.
11. **Button style:** Existing compact card button and existing secondary section CTA.
12. **Button destination:** Use all card and section destinations in `HOME.md` exactly.
13. **Reel/video:** No.
14. **Reusable component:** Yes: Related Content Card.

## 8. Market Insights

1. **Create:** A section with a heading Stack, three Market Insight Cards, and a section CTA.
2. **Use:** Frame, Stack, Grid, Component, Text, and optional Image.
3. **Desktop:** Three cards in the current card-grid pattern, with the section CTA beneath.
4. **Mobile:** One card per row, then the section CTA.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Left-align all copy.
7. **Spacing:** Reuse existing related-content spacing.
8. **Text style:** Matching existing section-heading style, **Body**, and current card-title style.
9. **Background:** Reuse existing market-card or page treatment.
10. **Image placement:** Use restrained chart placeholders or local imagery. Do not add market numbers until their sources are approved.
11. **Button style:** Existing compact card button and existing secondary section CTA.
12. **Button destination:** Use all card and section destinations in `HOME.md` exactly.
13. **Reel/video:** Optional placeholder only; not required at launch.
14. **Reusable component:** Yes: Market Insight Card.

## 9. Final Qualification CTA

1. **Create:** A full-width CTA band with a content Stack and one button.
2. **Use:** Frame, Stack, Text, and the existing primary CTA button.
3. **Desktop:** Keep one clear, uncluttered CTA band.
4. **Mobile:** Use one vertical Stack with button below copy.
5. **Width:** Reuse the current content-container width.
6. **Alignment:** Read the existing CTA-band alignment from Framer.
7. **Spacing:** Read the existing CTA-band spacing from Framer.
8. **Text style:** Matching existing section-heading style and **Body**.
9. **Background:** Reuse an existing CTA-band treatment; do not introduce a new color or gradient.
10. **Image placement:** None.
11. **Button style:** Existing primary CTA treatment.
12. **Button destination:** `/brooklyn-60-day-seller-success-blueprint/qualification`.
13. **Reel/video:** No.
14. **Reusable component:** Yes: CTA Band.

## Final check before publishing

- Compare all visible copy against `HOME.md`.
- Confirm all buttons use the exact destinations in `HOME.md`.
- Keep required compliance text visible where `HOME.md` places it.
- Keep the existing visual identity intact.
