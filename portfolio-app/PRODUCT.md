# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, weighted equally (confirmed by the owner):

- **Service-business owners** (clinics, salons, coaches, local services) who are losing leads and want them turned into booked appointments; they evaluate whether Christian can build that system for them.
- **Marketing / GoHighLevel agencies** looking for a capable builder or subcontractor to deliver client funnels, CRMs and automations.
- **Recruiters and employers** assessing him for a role; they want proof of skill, experience and credentials, and the CV.

Most arrive cold, often on a phone, and decide within a few scrolls whether he is credible.

## Product Purpose

The personal portfolio of Christian Padilla, a CRM and automation engineer specialising in GoHighLevel. It exists to make his systems thinking visible: funnels, pipelines, automation workflows and the outcomes they produce, so a visitor trusts him enough to make contact. Success is a visitor who explores the work (flowchart, funnel demos, workflow deep dives, experience) and then reaches out through one of the contact channels or downloads the CV.

## Positioning

He does not only design funnels or only wire automations; he builds the whole lead journey end to end, from strategy and the front-end funnel to the CRM, pipelines and follow-up automation inside GoHighLevel, and shows the actual workflow diagrams behind it. Backed by an HL Accelerator automation builder certification, a computer engineering degree, and hands-on executive-assistant and support experience.

## Operating Context

Single-page site at christianpadilla.online, deployed to GitHub Pages. Visitors scroll one continuous page; deeper detail opens in modals (portfolio slides, workflow inspection with zoom/pan, flowchart zoom on touch). External destinations: live funnel demos, a YouTube walkthrough, WhatsApp, email, LinkedIn, Telegram, Facebook, and a downloadable CV PDF.

## Capabilities and Constraints

- Content is locked: all copy and project data live in `src/data/` and component copy, and must not be rewritten.
- Section order and the user journey are locked: Hero, Problem/Solution, Flowchart, Systems (funnel demos), Workflows, Portfolio, Services, Tech Stack, About, Contact, Footer.
- Stack: React 19, TypeScript, Vite, Tailwind CSS 4, Motion and GSAP, Radix dialog/tabs, react-zoom-pan-pinch.
- Workflow screenshots stay at full 4000px resolution for zooming and load only when opened.
- No booking tool or contact form exists; "contact" means the five external channels.

## Brand Commitments

- The dark ground with champagne-gold accents is the recognisable identity and must be kept (owner: losing it would feel wrong).
- The personality is playful and creative, not corporate.
- Name and wordmark: "Christian Padilla." with the gold full stop, plus the CP monogram logo.

## Evidence on Hand

- Certifications: HLA Automation Builder certificate, training certificates, HighLevel Manila 2026 event photos and medallion, HLA badge (`public/img/badge.webp`, original `public/img/HLA Badge.png`).
- Education: B.S. Computer Engineering, Colegio de Muntinlupa (2022–2026), Project AeroVit, "Best Presenter" award.
- Experience: LifeCrafting (Executive Assistant; Full Stack Developer), IBEX Global (technical support for Walmart logistics).
- Work: system flowchart (`Mermaid.svg`), four live funnel demos, five automation workflow screenshots, a YouTube system walkthrough.
- Absent and not to be fabricated: client testimonials, client logos, revenue or conversion metrics, pricing.

## Product Principles

1. Show the system, not just the surface: diagrams and live demos are the proof.
2. Exploration leads to contact; never interrupt the work to sell.
3. Every audience must find its proof within a few scrolls: outcomes for owners, systems for agencies, credentials for recruiters.
4. Mobile is a first-class reading experience, not a shrunken desktop.

## Accessibility & Inclusion

Must stay easy to scan and tap on phones (owner requirement). Keyboard access, visible focus and reduced-motion support are already implemented and must be preserved.
