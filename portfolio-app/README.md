# christianpadilla.online

Personal portfolio for Christian Padilla, CRM & automation engineer. Single-page React app, deployed to GitHub Pages on every push to `main` (see `.github/workflows/deploy.yml`).

## Stack

- React 19 + TypeScript 6, built with Vite 8 (Rolldown)
- Tailwind CSS 4 (theme tokens in `src/index.css`) + `tw-animate-css` for enter/exit animations
- Motion (`motion/react`) and GSAP (SplitText, ScrollTrigger) for animation
- Radix UI dialog and tabs, `react-zoom-pan-pinch` for touch zoom
- Self-hosted Cormorant and Montserrat variable fonts (`@fontsource-variable`)

## Scripts

```bash
npm install
npm run dev        # local dev server with HMR
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
npm run typecheck  # tsc -b
```

Requires Node `^20.19` or `>=22.12` (CI uses Node 24).

## Layout

```
src/
  App.tsx              page composition
  data/                all copy and content: portfolio slides, services, workflows, contacts…
  components/
    layout/            navbar, custom cursor, backgrounds, footer
    sections/          one file per page section, in page order
    portfolio/         slide details, grid view, project modal
    workflows/         workflow modal with zoom/pan canvases (lazy-loaded)
    flowchart/         touch zoom dialog for the flowchart (lazy-loaded)
    ui/                generic building blocks (dialog, tabs, carousel, voxel grid, Tag…)
    icons/             brand icons not provided by lucide
  context/             shared portfolio tab/modal state (used by the About badge)
  hooks/               media queries, GSAP effects, image loading
  lib/                 smooth scrolling, media-query constants, a11y helpers, cn()
public/img/            optimized WebP images served as-is
```

To edit content (experience, certificates, services, links), change the files in `src/data/` — components only handle presentation.

## Images

Page images are WebP sized to how large they are displayed (about 2x for high-DPI screens). Portfolio covers have a light `-card.webp` used in the carousel/grid and a full-size version shown in the modal. The workflow screenshots in `public/img/Workflows/` are intentionally kept at 4000px so they stay sharp when zoomed, and they only download when their modal opens.

When adding an image, export it as WebP at roughly twice its on-screen size (quality 80–88).
