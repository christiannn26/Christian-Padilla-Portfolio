import type { ReactNode } from 'react';

/** Hairline pill naming a tool or skill. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ivory/75">
      {children}
    </span>
  );
}
