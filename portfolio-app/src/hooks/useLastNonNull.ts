import { useState } from 'react';

/**
 * Returns `value`, or the last non-null value once it becomes null.
 * Lets a dialog keep showing its content while the close animation plays.
 */
export function useLastNonNull<T>(value: T | null): T | null {
  const [last, setLast] = useState(value);
  if (value !== null && value !== last) setLast(value);
  return value ?? last;
}
