import React, { useRef, useEffect } from 'react';
import type { FC } from 'react';
import type { IProps } from './type';

export const Repeater: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef<() => void>();
  // methods
  const resolvePromise = (ignoreMode?: boolean) => {
    if ((ignoreMode || mode === 'visible') && typeof resolveRef.current === 'function') {
      resolveRef.current();
      resolveRef.current = void 0;
    }
  }
  // effect
  useEffect(() => () => resolvePromise(true), []);

  if (mode === 'hidden' && typeof resolveRef.current === 'undefined') {
    throw new Promise<void>((resolve) => (resolveRef.current = resolve));
  }

  resolvePromise();

  return <>{children}</>;
};
