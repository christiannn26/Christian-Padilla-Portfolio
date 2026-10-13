import { useCallback, useSyncExternalStore } from 'react';

// One MediaQueryList per query, shared by every component that asks: matchMedia() builds a
// new list on each call, and the snapshot below is read on every render.
const lists = new Map<string, MediaQueryList>();
const listFor = (query: string) => {
  let list = lists.get(query);
  if (!list) {
    list = window.matchMedia(query);
    lists.set(query, list);
  }
  return list;
};

/** Live media-query match. Correct on the very first render, so there is no desktop-then-mobile flash. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = listFor(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => listFor(query).matches);
}
