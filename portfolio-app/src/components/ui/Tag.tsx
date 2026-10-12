import type { ReactNode } from 'react';

/** Gold pill naming a tool or skill. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
      {children}
    </span>
  );
}
