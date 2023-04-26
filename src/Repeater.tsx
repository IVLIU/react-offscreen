import React, { useRef } from 'react';
import type { FC, ReactNode } from 'react';

export const Repeater: FC<{
  mode: 'visible' | 'hidden';
  children: ReactNode;
}> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef<() => void>();
  // destroy promise
  if (resolveRef.current) {
    resolveRef.current();
    resolveRef.current = void 0;
  }
  if (mode === 'hidden') {
    throw new Promise<void>((resolve) => (resolveRef.current = resolve));
  }
  return <>{children}</>;
};
