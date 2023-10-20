import React, { useRef, useEffect } from 'react';
import type { FC } from 'react';
import type { IProps } from './type';

export const Repeater: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef<() => void>();
  // methods
  const resolvePromise = () => {
    if (typeof resolveRef.current === 'function') {
      resolveRef.current();
      resolveRef.current = void 0;
    }
  }
  resolvePromise();
  // effect
  useEffect(() => resolvePromise, []);
  if (mode === 'hidden') {
    throw new Promise<void>((resolve) => (resolveRef.current = resolve));
  }
  return <>{children}</>;
};
