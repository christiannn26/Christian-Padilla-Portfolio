import type { KeyboardEvent } from 'react';

/** Gold keyboard-focus outline for custom interactive elements (invisible to mouse users). */
export const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/** Props that make a clickable non-button element reachable and operable from the keyboard. */
export function pressable(onActivate: () => void) {
  return {
    role: 'button',
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
      }
    },
  } as const;
}
