import flowchartSvg from '../../assets/flowchart.svg?raw';
// The same file the page preloads, so fetching it for the loupe is a cache hit.
import interLatinUrl from '@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2?url';

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

// The same palette as the `.flowchart-art` rules in index.css, written into the SVG itself
// for the copy that is shown as an <img> (page CSS and page fonts cannot reach inside an image).
const imageTheme = (id: string, fontUrl?: string) => `<style>
${fontUrl ? `@font-face{font-family:'Inter Variable';src:url(${fontUrl}) format('woff2');font-weight:100 900}` : ''}
#${id}{font-family:'Inter Variable',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif}
#${id} .node rect,#${id} .node polygon,#${id} .node circle,#${id} .node ellipse,#${id} .node path{fill:#141418!important;stroke:rgba(214,185,124,.42)!important;stroke-width:1px!important;filter:none!important}
#${id} .node [data-tone="action"]{fill:#221d13!important;stroke:rgba(214,185,124,.7)!important}
#${id} .node [data-tone="recovery"]{fill:#1b1b21!important;stroke:rgba(244,239,230,.28)!important}
#${id} .nodeLabel,#${id} .nodeLabel p,#${id} .label,#${id} foreignObject span,#${id} foreignObject div{color:#f4efe6!important;fill:#f4efe6!important}
#${id} .flowchart-link{stroke:rgba(244,239,230,.3)!important}
#${id} .marker,#${id} marker path{fill:rgba(244,239,230,.45)!important;stroke:rgba(244,239,230,.45)!important}
#${id} .edgeLabel,#${id} .edgeLabel p,#${id} .edgeLabel rect,#${id} .labelBkg{background-color:#0b0b0d!important;fill:#0b0b0d!important;color:rgba(244,239,230,.75)!important}
#${id} .cluster rect{fill:transparent!important;stroke:rgba(244,239,230,.12)!important}
</style>`;

/**
 * The themed diagram as an image URL. Moving or scaling an <img> is pure compositing,
 * so the loupe can track the cursor without re-rendering the live SVG every frame.
 * Without `fontUrl` the labels fall back to the system sans.
 */
export function flowchartImageSrc(copy: string, fontUrl?: string) {
  const id = `flowchart-${copy}`;
  const svg = flowchartMarkup(copy)
    .replace('width="100%"', 'width="2489" height="379"')
    .replace(/(<svg[^>]*>)/, `$1${imageTheme(id, fontUrl)}`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** The image URL with Inter embedded, so the loupe's labels match the page's. */
export async function flowchartImageSrcWithFont(copy: string) {
  const font = await (await fetch(interLatinUrl)).blob();
  const fontUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(font);
  });
  return flowchartImageSrc(copy, fontUrl);
}
