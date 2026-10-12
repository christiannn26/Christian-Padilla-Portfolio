/** Mouse-driven devices: enables hover-only effects (tilt, magnet, flowchart lens). */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** Phones, tablets and touch-first devices: native scrolling, no custom cursor. */
export const TOUCH_OR_SMALL = '(max-width: 768px), (pointer: coarse)';

/** One-off check for use inside event handlers and effects. */
export const matches = (query: string) => window.matchMedia(query).matches;
