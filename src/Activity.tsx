"use client";
import React, { Suspense } from "react";
import { Repeater } from "./Repeater";
import { canUseDOM } from "./canUseDOM";
import type { FC, ExoticComponent } from "react";
import type { IProps } from "./type";

const isSupportStableActivity = "Activity" in React;
const isBrowser = canUseDOM();

const NativeActivity = isSupportStableActivity
  ? // @ts-expect-error React.Activity is not yet fully typed in @types/react
    (React.Activity as ExoticComponent<IProps>)
  : "unstable_Activity" in React
    ? (React.unstable_Activity as ExoticComponent<IProps>)
    : null;

if (isBrowser && isSupportStableActivity) {
  console.warn(
    navigator.language === "zh-CN"
      ? "检测到您使用的react版本已经原生支持了Activity，我们 建议您迁移至原生Activity。"
      : "It is detected that the react version you are using already supports Activity natively. We recommend that you migrate to native Activity.",
  );
}

/**
 *
 * @param {IProps} props
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

/**
 * @deprecated
 * @description please rename Offscreen to Activity
 */
export const Offscreen: FC<IProps> = Activity;
