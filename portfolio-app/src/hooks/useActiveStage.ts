import { useSyncExternalStore } from 'react';
import { STAGES, type StageId } from '../data/navigation';

// One shared observer for every subscriber (rail, nav): the stage whose section
// crosses the reading line just above the middle of the viewport is "now".
let active = 0;
const listeners = new Set<() => void>();
let observer: IntersectionObserver | null = null;

function start() {
  const visible = new Map<string, boolean>();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
      // The last stage in page order that is on the reading line wins.
      let next = -1;
      STAGES.forEach((stage, i) => {
        if (visible.get(stage.id)) next = i;
      });
      // Near the very bottom the final stage may never reach the line; land on it anyway.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) next = STAGES.length - 1;
      if (next !== -1 && next !== active) {
        active = next;
        listeners.forEach((notify) => notify());
      }
    },
    { rootMargin: '-38% 0px -58% 0px' },
  );
  STAGES.forEach((stage) => {
    const el = document.getElementById(stage.id);
    if (el) observer!.observe(el);
  });
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (!observer) start();
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/** Index into STAGES of the section currently being read. */
export function useActiveStage() {
  return useSyncExternalStore(subscribe, () => active);
}

/**
 * Spread onto a section: marks it `data-now` while it is the stage being read, which is
 * what lets its `.now-gold` words light up (gold is reserved for "now").
 */
export function useStageNow(id: StageId) {
  const index = useActiveStage();
  return { 'data-now': STAGES[index].id === id ? '' : undefined };
}
