import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react';

// Rows of the source image to average, as a share of its height. The funnel mockups are composed
// on paper with a clean margin above the monitor bezel (about the first 2.75%), so 2% stays inside it.
const STRIP = 0.02;

const cache = new Map<string, string>();

function sample(img: HTMLImageElement) {
  const known = cache.get(img.currentSrc || img.src);
  if (known) return known;
  const width = 64;
  const rows = Math.max(1, Math.round(img.naturalHeight * STRIP));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  // Squash the strip into one row, then average it
  ctx.drawImage(img, 0, 0, img.naturalWidth, rows, 0, 0, width, 1);
  const data = ctx.getImageData(0, 0, width, 1).data;
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const n = data.length / 4;
  const tone = `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`;
  cache.set(img.currentSrc || img.src, tone);
  return tone;
}

/**
 * The average colour of an image's top margin, as `rgb(r g b)`. Lets a frame extend the paper a
 * mockup is composed on, matching it exactly instead of by eye. Spread `ref` and `onLoad` onto the
 * <img> itself: the tone is read from the copy the page already loaded (lazily), so it costs no
 * extra download. Returns `fallback` until then.
 */
export function usePaperTone(fallback: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [tone, setTone] = useState(fallback);

  const read = useCallback((img: HTMLImageElement) => {
    try {
      const value = sample(img);
      if (value) setTone(value);
    } catch {
      // A tainted or undecodable image keeps the fallback
    }
  }, []);

  // A cached image can finish loading before React attaches onLoad
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth) read(img);
  }, [read]);

  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => read(e.currentTarget), [read]);

  return { tone, ref, onLoad };
}
