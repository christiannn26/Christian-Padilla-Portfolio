import { useEffect, useState } from 'react';

/** True once `src` has finished downloading — used to swap a blurred thumbnail for the full image. */
export function useImageLoaded(src: string) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoadedSrc(src);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  return loadedSrc === src;
}
