import React, { Suspense } from 'react';
import { Repeater } from './Repeater';
import type { FC, ReactNode } from 'react';

export const Offscreen: FC<{
  mode: 'visible' | 'hidden';
  children: ReactNode;
}> = (props) => {
  const { mode, children } = props;
  return (
    <Suspense>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
