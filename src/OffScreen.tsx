import React, { Suspense, useEffect } from 'react';
import { Repeater } from './Repeater';
import type { FC, ReactNode, EffectCallback } from 'react';

export const effect = { current: null } as { current: Set<EffectCallback> | null };

export const Offscreen: FC<{
  mode: 'visible' | 'hidden';
  children: ReactNode;
}> = (props) => {
  // props
  const { mode, children } = props;

  // effect
  useEffect(() => {
    if(effect.current === null) {
      return;
    }
    const effectSet = effect.current;
    const destroySet = new Set<() => void>();
    effectSet.forEach((callback) => {
      const destructor = callback();
      if(typeof destructor === 'function') {
        destroySet.add(destructor);
      }
    });
    effectSet.clear();
    effect.current = null;
    return () => {
      destroySet.forEach((destroy) => destroy());
      destroySet.clear();
    };
  }, [mode]);

  effect.current = new Set();
  return (
    <Suspense>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
