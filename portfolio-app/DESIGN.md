---
name: Christian Padilla, The Pipeline
description: A keynote-black stage where the page is a lead pipeline and champagne gold marks only what is happening now.
colors:
  ink-950: "#060607"
  ink-900: "#0b0b0d"
  ink-850: "#101013"
  ink-800: "#16161a"
  ink-700: "#1f1f25"
  ink-600: "#2b2b32"
  ivory: "#f4efe6"
  ivory-muted: "rgb(244 239 230 / 0.64)"
  gold: "#d6b97c"
  gold-bright: "#efdcae"
  gold-deep: "#a48748"
  line: "rgb(244 239 230 / 0.09)"
  line-strong: "rgb(244 239 230 / 0.16)"
  flow-node: "#141418"
  flow-action: "#221d13"
  flow-recovery: "#1b1b21"
  mesh-slate: "rgb(112 126 162 / 0.065)"
typography:
  display:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.35rem + 3.9vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 2.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1.2rem + 2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  subsection:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  menu:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.022em"
  figure:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  body-lg:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  ui:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
  ui-sm:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
  label:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
  label-micro:
    fontFamily: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  pill: "9999px"
  sheet: "2.5rem"
  record-lg: "2rem"
  record: "1.75rem"
  card: "1.5rem"
  inner: "1.25rem"
spacing:
  gutter: "24px"
  gutter-lg: "40px"
  record-inset: "10px"
  card-pad: "28px"
  stage: "clamp(4.5rem, 3rem + 4.5vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink-950}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    height: "52px"
    padding: "0 8px 0 28px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.ink-950}"
  button-secondary:
    backgroundColor: "rgb(6 6 7 / 0.4)"
    textColor: "{colors.ivory}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    height: "52px"
    padding: "0 28px"
  button-secondary-hover:
    textColor: "{colors.gold-bright}"
  nav-bar:
    backgroundColor: "rgb(16 16 19 / 0.68)"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    height: "56px"
  nav-link:
    textColor: "rgb(244 239 230 / 0.6)"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-demo:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "10px 12px 10px 20px"
  button-demo-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink-950}"
  tag:
    backgroundColor: "transparent"
    textColor: "rgb(244 239 230 / 0.75)"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  record-card:
    backgroundColor: "rgb(16 16 19 / 0.72)"
    textColor: "{colors.ivory}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.record}"
    padding: "{spacing.card-pad}"
  flowchart-node-action:
    backgroundColor: "{colors.flow-action}"
    textColor: "{colors.ivory}"
  dialog:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Christian Padilla, The Pipeline

## Overview

**Creative North Star: "The Pipeline"**

The page is Christian's own lead pipeline and the visitor is the lead moving through it. Ten stages sit on a hairline rail; one gold lead token advances as the visitor reads, the stages behind it fill in, and the journey lands on Get In Touch. The world is a keynote stage: near-black grounds stepping up to raised graphite, ivory type, a faint drifting mesh of light behind everything and a fine film grain so large dark fields never band. Everything that is not "now" rests in ivory and graphite.

Density is generous and editorial. Sections breathe on one shared vertical rhythm; content sits in a 12-column grid inside an 80rem container. Hierarchy comes from scale (one family, Inter, set large, semibold and tight at headline sizes against quiet body text) and from the single reserved colour, never from boxes, badges or labels stacked above headings. Content is presented as records: cards read like CRM entries, with tracked caps field labels followed by their values.

The world refuses the dark-glass freelancer template: gradient headings, gold glows around buttons and cards, and interchangeable glass cards. Glass exists, but only on layers that float above the page.

**Key Characteristics:**
- One accent, champagne gold, spent only on what is current: the active stage, the lead token, primary actions, live signal pulses.
- Hairline rules (1px ivory at 9% and 16%) and black shadows define every surface.
- One family, Inter Variable with optical sizing: semibold headings whose tracking tightens as size grows; regular text for everything readable; tracked caps for labels.
- Pills for every action and chip; large soft-cornered records for content.
- Motion is custom ease-out, quick on press, slow and settling on reveal, and always yields to reduced motion.

## Colors

A near-monochrome stage of warm blacks and ivory, lit by one desaturated champagne gold.

### Primary
- **Champagne Gold** (gold): the colour of "now". Primary action fills, the pipeline lead token and the rail stem behind it, the active stage number in the nav readout, live status dots, focus rings, text selection, the caret, and heading accent words while their section is the active stage.
- **Lit Champagne** (gold-bright): hover state of gold fills and gold-lit text; the travelling pulses on the flowchart edges.
- **Spent Gold** (gold-deep): stages the lead has already passed on the rail; strike-through decoration on "before" copy. Gold that has been, not gold that is.

### Neutral
- **Stage Black** (ink-950): page ground, the atmosphere layer, the content sheet (solid at its top edge, 30% below), dialog overlays (at 75%), text on gold fills.
- **Pit Black** (ink-900): dialog surfaces, the hero record card, flowchart edge-label plates, the loupe's ground.
- **Graphite Record** (ink-850): the record surface family (cards and glass both mix from it) and the hover fill of contact records.
- **Raised Graphite** (ink-800, ink-700, ink-600): image wells, inactive fills, scrollbar thumb. ink-600 is the highest step; nothing on the stage is lighter than graphite except type and gold.
- **Ivory** (ivory): headings and primary text, tag text at 75%, nav links at 60%, label caps at 45 to 80%.
- **Quiet Ivory** (ivory-muted): ledes, paragraphs and secondary copy.
- **Hairline** (line) and **Strong Hairline** (line-strong): every border, divider, rail and chip outline. line is the default border colour on every element.

### Diagram and Atmosphere
- **Flow Node** (flow-node): the default flowchart node fill, stroked in gold at 42%.
- **Flow Action** (flow-action): a gold-warmed graphite for action-step nodes, stroked in gold at 70%. It replaces the Mermaid export's blue action tone so the diagram's meaning survives in the stage palette.
- **Flow Recovery** (flow-recovery): a cool graphite for recovery-path nodes, stroked in ivory at 28%.
- **Mesh Slate** (mesh-slate): the only cool hue in the system, a slate counter-light in the background mesh. It lives in the atmosphere layer only; never on an element.

### Named Rules
**The Gold Is Now Rule.** Gold marks only what is current or what acts. Heading accent words rest in ivory and turn gold (700ms colour transition) only while their section is the active stage. Subtitles, tags, icons at rest, card borders at rest and body copy are never gold. Hover may borrow gold (borders at 30 to 50%, icon fills, the demo pill's fill) because hover is the visitor's "now".

**The One Static Keyline Exception.** The hero portrait record carries a permanent gold keyline (gold at 40%, inner ring at 25%) and its "10+" field in gold. It is the opening record of the pipeline; do not extend permanent gold keylines to other cards.

## Typography

**Display Font:** Inter Variable (with -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif), optical sizing on
**Body Font:** Inter Variable (same stack)

**Character:** One family in two optical cuts, the way SF Pro works: the opsz axis gives the Display cut at headline sizes and the Text cut for body, so a single self-hosted face carries the keynote voice and every word that has to be read quickly. The same face in tracked caps becomes the record's field-label voice.

### Hierarchy
- **Display** (600, clamp 40 to 72px, 1.04, -0.045em): the hero headline only, revealed character by character.
- **Headline** (600, clamp 34 to 60px, 1.06, -0.04em): section headings. One accent phrase per heading may carry the now-gold treatment.
- **Statement** (600, clamp 30 to 48px, 1.12, -0.035em): the long sentence-headings of About and Tech Stack.
- **Subsection** (600, clamp 24 to 36px, 1.15, -0.03em): subsection and showcase headings.
- **Menu** (600, 26px, 1, -0.03em): mobile menu entries.
- **Title** (600, 22px, 1.25, -0.022em): card, record and flip-card titles.
- **Figure** (600, 32px, 1, -0.04em, tabular numerals): a single record value set as a number (the hero "10+").
- **Body Large** (400, 18px, relaxed 1.625): header ledes beside section headings; the hero lede from 1024px.
- **Body** (400, 17px, 1.625 to 1.8): ledes and long paragraphs in Quiet Ivory, measure held to roughly 34rem (max-w-136) to 62ch. Modal and slide copy steps to 16px at 1.75.
- **Body Small** (400, 15px, relaxed): card and flip-card body, record values, contact values.
- **UI** (600, 15px): primary and secondary buttons; the 15px nav wordmark (semibold, -0.02em; 18px in the footer).
- **UI Small** (500 to 600, 13px): nav links, the nav Contact pill, demo pills, captions and hints. Tailwind sm (14px) and xs (12px) carry footer copy and tags.
- **Label** (600, 11px, 0.14em, uppercase): record field labels (Type, Industry, Powered By, contact channel names), stage names on the rail and nav readout, the hero record header, slide subtitles, "Back to top".
- **Label Micro** (600, 9px, 0.18em, uppercase): only the stage line under the wordmark on phones and tablets.

### Named Rules
**The One Family Rule.** Every word is Inter Variable. Headings (h1 to h6) are semibold (600) with balanced wrapping and tighten their tracking as they grow, from -0.022em at title size to -0.045em at display size; paragraphs wrap pretty. No second display face; the system fonts are fallbacks while Inter loads, never a choice.

**The Label-Then-Value Rule.** Tracked caps label a value that follows them. They never sit above a heading as a section kicker or eyebrow.

## Layout

One continuous page in a locked section order. Content lives in a centred container of 80rem (max-w-7xl) with 24px side gutters, widening to 40px from 1024px; the nav bar is narrower (64rem) and floats 12 to 16px below the top edge. Below the hero, sections sit on one content sheet that rises 40px over the hero with 40px top corners. Sections share one vertical rhythm, the stage padding (clamp 72px to 120px top and bottom), so the page reads as evenly spaced stages. Two-column compositions use a 12-column grid (7/5 in the hero and in section header rows, 6/6 in Contact) with 32 to 64px gaps, collapsing to a single column below 1024px.

**The Shared Header Row Rule.** A section header that pairs a heading with a paragraph uses the 7/5 split, bottom-aligned (items-end), with the paragraph in Body Large Quiet Ivory. When a section has two such rows (Systems Showcase), both use the identical split, alignment and paragraph style so they read as one system.

Showcase mockups sit in an equal two-column grid from 768px (16 to 20px gaps), each in a square frame with the image contained, never cropped. The four Problem/Solution flip cards form one hairline-ruled row (2 by 2 at 768px, 1 by 4 at 1024px); each face centres its icon and copy on the card's axis and hangs the stack from a fixed top inset (48px in the row, 56px on the phone cards), so icons and titles share one line across the row.

Breakpoints follow Tailwind defaults (640, 768, 1024, 1536px) plus one system breakpoint: the pipeline rail appears from 1400px, fixed 24px (32px from 1536px) off the left edge, vertically centred, 56vh tall up to 520px. Below 1400px the stage name moves into the nav: inline readout from 1024px, a second line under the wordmark on phones and tablets, and a gold hairline progress stem along the bottom of the nav bar below 768px. Mobile is a first-class layout: full-width pill actions up to 272px, stacked records, and a 44px minimum touch target (the menu button and demo pills are 44px, hero actions 52px).

## Elevation & Depth

Depth is lit, not coloured. Surfaces step up through the ink ramp, separate with 1px ivory hairlines and an inset top highlight, and sit on long, soft, pure-black drop shadows with negative spread so the shadow pools under the object rather than haloing it. Glass (blurred, saturated graphite) is reserved for layers that float over the page.

The atmosphere behind everything is a near-black vertical gradient (#0a0a0c to Stage Black to #050506) under three oversized radial mesh fields that drift too slowly to notice: warm champagne (gold at 8.5%), a cool slate counter-light (Mesh Slate at 6.5%) and a low warm bounce (Spent Gold at 5.5%), on 46s, 58s and 52s loops. A faint ivory sheen (3.5%) falls from the top and a 5% soft-light film grain covers it all. The content sheet is Stage Black at its top edge fading to 30% within 260px, so the mesh reads through it, and casts one black shadow up onto the hero. The hero adds a warm key-light pool behind the portrait and a black vignette. These ambient lights belong to the stage, not to any element.

### Shadow Vocabulary
- **Glass float** (`inset 0 1px 0 rgb(244 239 230 / 0.06), 0 18px 40px -18px rgb(0 0 0 / 0.85)`): nav bar, mobile menu, rail hover labels, dialog close buttons, carousel arrows, flowchart HUD.
- **Record rest** (`inset 0 1px 0 rgb(244 239 230 / 0.03), 0 24px 48px -32px rgb(0 0 0 / 0.9)`): content records and tiles.
- **Action lift** (`0 18px 40px -18px rgb(0 0 0 / 0.9)`): the primary gold pill.
- **Hero record** (`0 40px 80px -30px rgb(0 0 0 / 0.95)`): the portrait record and other showcase frames.
- **Sheet edge** (`0 -30px 60px -20px rgb(0 0 0 / 0.9)`): the content sheet's upward shadow onto the hero.
- **Loupe** (`0 30px 60px -20px rgb(0 0 0 / 0.95)` plus an inner `inset 0 0 40px rgb(0 0 0 / 0.55)` falloff): the flowchart magnifier.
- **Stage modal** (`0 60px 120px -40px rgb(0 0 0 / 0.95)`): full project and workflow modals.

### Named Rules
**The Quiet Stage Rule.** The background must never compete with content. Mesh fields stay below 9% opacity, drift on loops of 45 seconds or longer, sit behind a pointer-transparent layer, and stop under prefers-reduced-motion. If a field is noticeable while reading, it is too strong.

**The Black Shadow Rule.** Every shadow is black. No coloured box-shadow, text-shadow or glow on any element (the Mermaid node drop-shadows are stripped for this reason); gold light exists only as ambient stage light in the background layers.

**The Floating Glass Rule.** Glass (graphite at 68%, 20px blur, 140% saturation, 10% ivory border) is used only on layers that float: nav, menus, dialog chrome, HUD, carousel arrows, rail tooltips. Cards on the page are records, never glass.

## Shapes

Two shape families. Everything you press or that names a thing is a full pill: buttons, nav bar, nav links, tags, icon buttons, rail nodes, status dots, the loupe. Everything that holds content is a large soft record: 40px for the top of the content sheet, 32px for showcase and hero records, 28px for content records and the mobile menu, 24px for contact records, dialogs and image wells, 20px for items nested inside a record. Records with an image use a 10px inset frame so the image's own 24px corner nests inside the 32px outer corner. Borders are always 1px hairlines; the rail, scroll cue and dividers are 1px lines. The flowchart sits on a 32px blueprint grid of 3.5% ivory lines.

## Components

### Buttons
Confident pills that sink slightly when pressed.
- **Shape:** full pill (9999px), 52px tall in the hero, 44px minimum elsewhere.
- **Primary:** gold fill, Stage Black semibold 15px text, a black action-lift shadow; the hero variant ends in a 36px Stage Black disc holding a gold arrow that nudges 2px on hover. Hover lifts to Lit Champagne. Primary actions are always gold, and only primary actions are gold-filled at rest.
- **Secondary:** Stage Black at 40% with a strong hairline border and light backdrop blur, ivory medium text, a muted trailing icon. Hover warms the border to gold at 50% and the text to Lit Champagne.
- **Demo pill:** a strong-hairline pill (44px minimum, 13px semibold ivory) ending in a 24px disc with an up-right arrow; hover fills it gold with Stage Black text and nudges the arrow 1px.
- **Icon buttons:** 44 to 48px glass or hairline circles; icons turn gold or fill gold on hover.
- **Press:** every pressable element scales to 0.97 on press, with a 180ms ease-out-quint transition on transform, colour, border and shadow.
- **Focus:** 2px gold outline at 3px offset, everywhere.
- **Magnetic:** hero actions drift toward the pointer (GSAP), disabled under reduced motion.

### Chips
- **Style:** transparent pill, strong hairline border, 12px medium text in ivory at 75 to 80%, 4px by 12px padding.
- **State:** static labels for tools and skills; inside a hovered record the border warms to gold at 30%. Never gold-filled.

### Cards / Containers
- **Corner Style:** 24 to 32px (see Shapes).
- **Background:** graphite record surface (ink-850 at 72%), hover to solid ink-850 on interactive records.
- **Shadow Strategy:** record rest; showcase frames use hero record (see Elevation & Depth).
- **Border:** 1px hairline; interactive records warm to gold at 30 to 40% on hover.
- **Internal Padding:** 28px for text records, 16 to 24px for contact records, 10px inset for image records.
- **Field layout:** label caps (ivory 45 to 50%) followed by the value in ivory at 85%, Body Small.

### Navigation
- **Bar:** a floating glass pill, 56px tall, max 64rem wide. Left: CP monogram and the "Christian Padilla." wordmark (15px semibold) with a gold full stop. Then the stage readout: gold two-digit stage number and the stage name in label caps, cross-fading with a 10px rise and 4px blur as stages change; hidden on the first stage.
- **Links:** 13px medium, ivory at 60%, full ivory when current, with a 4px gold dot that slides between links (shared layout spring). Contact is the gold pill at the end.
- **Mobile:** a 44px menu button opens a glass panel (28px corners) of 26px semibold entries with gold arrows; Contact is the gold row. A gold hairline stem grows along the bottom of the bar with scroll progress.

### Pipeline Rail (signature)
A vertical 1px strong-hairline rail with ten 7px nodes. Passed stages fill Spent Gold; upcoming stages are hollow ivory-30% rings. A gold stem grows behind the lead (700ms ease-out-quint). The lead token is a 14px gold disc with a signal ring that scales to 3.2x and fades every 2.4s; it springs between nodes and pops on arrival at the final stage. The active stage's name runs vertically beside its node in label caps; hovering any other node shows a glass tooltip with its gold number.

### Problem/Solution Flip Cards
Each card is one object turning: the front states the problem (44px hairline icon disc, Title, Body Small in Quiet Ivory), the back the system that replaces it (44px gold icon disc, Title in Lit Champagne). On desktop the four columns hang in a hairline-ruled row and flip on hover, click or Enter (700ms ease-out-quint); only the flipped face takes a gold wash (gold at 5%). On phones each card is a sticky record that flips as its track scrolls past.

### Living Flowchart (signature)
The system diagram re-lit for the stage on a blueprint grid: Flow Node fills with gold-at-42% strokes, Flow Action fills with gold at 70%, Flow Recovery fills with ivory at 28%, ivory Inter labels, edges in ivory at 30%. Node drop-shadows from the export are removed. Gold-bright pulses (2.25px, round caps) travel the edges. A glass HUD disc marks tap-to-zoom on touch.

**Loupe (fine pointers).** A 240px circular magnifier (1.9x) with a gold-at-70% hairline, four gold reticle ticks and an inner black falloff. It follows the pointer through motion values on a stiff spring (stiffness 1000, damping 38, mass 0.3), so tracking never re-renders. The magnified copy is an image of the themed SVG with Inter embedded at runtime, so its labels match the page. It enters over 200ms ease-out-quint (scale 0.9 to 1 with a fade) and exits over 150ms; under reduced motion it only fades. While inspecting, the stage diagram dims to 30% opacity (300ms), never blurs.

### Custom Pointer (signature)
On fine pointers a 6px gold dot follows the cursor; over compact controls (up to 360 by 96px) a ring morphs onto the control's own shape, and over cards it becomes a larger ring carrying a gold arrow.

### Motion
- **Curves:** ease-out-quint `cubic-bezier(0.23, 1, 0.32, 1)` for UI state; ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` for reveals; ease-in-out-strong `cubic-bezier(0.77, 0, 0.175, 1)` for the scroll-cue chase. (ease-drawer `cubic-bezier(0.32, 0.72, 0, 1)` is declared for sheets but no shipped surface uses it yet.) No ease-in curves; symmetric ease-in-out only on ambient loops that never start or end.
- **Reveal:** content starts faint, not hidden (opacity 0.2, 18px down, 8px blur) and settles over 900ms on ease-out-expo when 12% into view, once.
- **Loops:** the signal ring (2.4s), the scroll cue's single light chasing down a hairline (2.2s), the logo marquee (40s), the background mesh drift (46s, 58s, 52s).
- **Reduced motion:** reveals render in place, the headline split is skipped, the mesh stops, the lead jumps without a spring, the loupe only fades.

## Do's and Don'ts

### Do:
- **Do** reserve gold for the current stage, the lead token, primary actions, live signals, focus and hover; keep heading accents in ivory until their section is active.
- **Do** separate surfaces with 1px hairlines (ivory at 9% or 16%) and pure black shadows with negative spread.
- **Do** set every word in Inter Variable, headings semibold on the type-scale steps with tracking that tightens as size grows.
- **Do** label record fields with 11px tracked caps (0.14em) followed by their value.
- **Do** use full pills for anything pressable or naming a thing, and 24 to 32px corners for content records.
- **Do** give every pressable element the 0.97 press scale with a 180ms ease-out-quint transition, a 2px gold focus outline at 3px offset, and a 44px minimum touch target.
- **Do** reveal content from faint (opacity 0.2 plus blur), never from invisible, and honour prefers-reduced-motion.
- **Do** keep every section on the shared stage padding (clamp 72px to 120px).
- **Do** keep the background quiet: mesh fields under 9% opacity, loops of 45s or longer, stopped under reduced motion.
- **Do** show product mockups whole: square frames, contained, never cropped.

### Don't:
- **Don't** put an eyebrow or kicker above a heading; stage names live in the nav readout and on the pipeline rail.
- **Don't** use gradient text or coloured glows (gold box-shadow, text-shadow or halo) on any element.
- **Don't** make cards glass; glass is only for floating layers (nav, menus, dialog chrome, HUD, carousel arrows).
- **Don't** colour subtitles, tags, resting icons or resting card borders gold.
- **Don't** use built-in ease-in curves; state changes ease out.
- **Don't** add a second typeface or let a system font stand in as a design choice.
- **Don't** let the background compete with content, and don't blur the stage behind a focused element; dim it.
