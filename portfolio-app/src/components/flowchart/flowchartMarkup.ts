import flowchartSvg from '../../assets/flowchart.svg?raw';

// The Mermaid export paints node tones with inline `!important` fills that no stylesheet
// can override. Keep the meaning (blue = action step, grey = recovery path) but hand the
// colour to the page's palette through a data attribute.
const themed = flowchartSvg
  // The export also ships an unscoped `p { margin: 0 }`. Inlined, it would sit outside the
  // cascade layers and zero every paragraph margin on the page; the scoped copy remains.
  .replace('<style xmlns="http://www.w3.org/1999/xhtml">p {margin: 0;}</style>', '')
  .replaceAll('style="fill:#BBDEFB !important"', 'data-tone="action"')
  .replaceAll('style="fill:#94a3b8 !important"', 'data-tone="recovery"');

// The export scopes its styles and marker references to id "export-svg".
// Each inline copy gets its own id so copies never collide or share styles.
export const flowchartMarkup = (copy: string) => themed.replaceAll('export-svg', `flowchart-${copy}`);

/** Intrinsic size of the diagram's viewBox, so the page reserves its space up front. */
export const FLOWCHART_ASPECT = '2489 / 379';
