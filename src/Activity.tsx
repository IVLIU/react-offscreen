import React, { Suspense } from 'react';
import { Repeater } from './Repeater';
import type { FC, ExoticComponent } from 'react';
import type { IProps } from './type';

const NativeActivity = ('Activity' in React ? React.Activity : 'unstable_Activity' in React ? React.unstable_Activity : null) as ExoticComponent<IProps> | null;

export const Activity: FC<IProps> = (props) => {
  const { mode, children } = props;

  if(NativeActivity) {
    return (
      <NativeActivity mode={mode}>{children}</NativeActivity>
    )
  }

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
