export const NAV_ITEMS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact Me' },
] as const;

/**
 * The page read as a pipeline: one stage per section, in page order.
 * Labels reuse each section's own heading label; `id` is the section's DOM id.
 */
export const STAGES = [
  { id: 'top', label: 'Christian Padilla' },
  { id: 'impact', label: 'The Impact' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'systems', label: 'The System' },
  { id: 'deep-dives', label: 'Deep Dives' },
  { id: 'portfolio', label: 'Experience & Work' },
  { id: 'services', label: 'Services' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Get In Touch' },
] as const;

export type StageId = (typeof STAGES)[number]['id'];

export const stageIndex = (id: StageId) => STAGES.findIndex((stage) => stage.id === id);
