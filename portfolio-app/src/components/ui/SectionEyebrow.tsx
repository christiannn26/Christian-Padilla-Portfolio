import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Small tracked-out gold label that sits above each section title. */
export function SectionEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4', className)}>{children}</h2>;
}
