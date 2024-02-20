import React, { Suspense } from 'react';
import { Repeater } from './Repeater';
import type { FC, ExoticComponent } from 'react';
import type { IProps } from './type';

// @ts-ignore
const NativeActivity = (React.Activity || React.unstable_Activity) as ExoticComponent<IProps> | undefined;

export const Activity: FC<IProps> = (props) => {
  const { mode, children } = props;

  if(NativeActivity) {
    return (
      <Activity mode={mode}>{children}</Activity>
    )
  }

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
