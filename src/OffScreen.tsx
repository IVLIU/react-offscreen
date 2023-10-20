import React, { Suspense } from 'react';
import { Repeater } from './Repeater';
import type { FC } from 'react';
import type { IProps } from './type';

export const Offscreen: FC<IProps> = (props) => {
  const { mode, children } = props;
  return (
    <Suspense>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
