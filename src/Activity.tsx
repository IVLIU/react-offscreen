import React, { Suspense } from "react";
import { Repeater } from "./Repeater";
import type { FC, ExoticComponent } from "react";
import type { IProps } from "./type";

const NativeActivity = (
  "Activity" in React
    // @ts-ignore
    ? React.Activity as ExoticComponent<IProps>
    : "unstable_Activity" in React
      // @ts-ignore
      ? React.unstable_Activity as ExoticComponent<IProps>
      : null
);

/**
 * 
 * @param props IProps
 * @description This is a component that keeps its state while hiding it
 * @example 
 * when visible
 * <Activity mode="visible">
 *  <Child />
 * </Activity>
 * when hidden
 * <Activity mode="hidden">
 *  <Child />
 * </Activity>
 */
export const Activity: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;

  if (NativeActivity) {
    return <NativeActivity mode={mode}>{children}</NativeActivity>;
  }

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};
