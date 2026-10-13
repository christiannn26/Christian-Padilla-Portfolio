import { useEffect, useState } from 'react';

// Rows of the source image to average, as a share of its height. The funnel mockups are composed
// on paper with a clean margin above the monitor bezel (about the first 2.75%), so 2% stays inside it.
const STRIP = 0.02;

const cache = new Map<string, string>();

/**
 * The average colour of the top margin of an image, as `rgb(r g b)`. Lets a frame extend the
 * paper a mockup is composed on, matching it exactly instead of by eye. Returns `fallback` until
 * the image has been read (it is the same file the page is already loading, so this is cheap).
 */
export function usePaperTone(src: string, fallback: string) {
  const [tone, setTone] = useState(() => cache.get(src) ?? fallback);

  useEffect(() => {
    const known = cache.get(src);
    if (known) {
      setTone(known);
      return;
    }
    let live = true;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    img
      .decode()
      .then(() => {
        const width = 64;
        const rows = Math.max(1, Math.round(img.naturalHeight * STRIP));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
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
        const value = `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`;
        cache.set(src, value);
        if (live) setTone(value);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src]);

  return tone;
}
