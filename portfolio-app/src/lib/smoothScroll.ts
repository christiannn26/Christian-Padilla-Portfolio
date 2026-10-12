import { matches, TOUCH_OR_SMALL } from './media';

/** Dispatched on window around the custom desktop glide so heavy canvases can pause. */
export const SCROLL_START_EVENT = 'scroll-start';
export const SCROLL_END_EVENT = 'scroll-end';

const GLIDE_DURATION = 800; // 0.8s for a very snappy, elegant glide

// easeInOutCubic: softer acceleration/deceleration
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Scrolls to the section with `targetId` ('top' for the page top).
 * Desktop gets a custom eased glide; touch devices keep the browser's native
 * smooth scroll so momentum physics are preserved.
 */
export function scrollToSection(targetId: string) {
  const targetElement = document.getElementById(targetId);

  if (matches(TOUCH_OR_SMALL)) {
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  const startPosition = window.scrollY;
  const targetPosition =
    targetId === 'top' || !targetElement ? 0 : targetElement.getBoundingClientRect().top + startPosition;
  const distance = targetPosition - startPosition;
  let start: number | null = null;

  // Disable pointer events to prevent expensive hover recalculations while scrolling
  document.body.style.pointerEvents = 'none';
  window.dispatchEvent(new Event(SCROLL_START_EVENT));

  const step = (currentTime: number) => {
    start ??= currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / GLIDE_DURATION, 1);

    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

    if (timeElapsed < GLIDE_DURATION) {
      requestAnimationFrame(step);
    } else {
      document.body.style.pointerEvents = '';
      window.dispatchEvent(new Event(SCROLL_END_EVENT));
    }
  };

  requestAnimationFrame(step);
}
