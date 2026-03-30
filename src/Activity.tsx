"use client";

declare let process: { env: { NODE_ENV: string } };
import React, { Suspense } from "react";
import { Repeater } from "./Repeater";
import { canUseDOM } from "./canUseDOM";
import type { FC, ExoticComponent } from "react";
import type { IProps } from "./type";

const isSupportStableActivity = "Activity" in React;
const isBrowser = canUseDOM();

// LazyComponent detection: React.lazy() creates components with $$typeof = Symbol.for('react.lazy')
const REACT_LAZY_TYPE = Symbol.for("react.lazy");

function isLazyComponent(children: React.ReactNode): boolean {
  if (typeof children !== "object" || children === null) {
    return false;
  }
  if (Array.isArray(children)) {
    return children.some((child) => isLazyComponent(child));
  }
  const element = children as { type?: { $$typeof?: symbol } };
  return element.type?.$$typeof === REACT_LAZY_TYPE;
}

function warnOnLazyChildren(children: React.ReactNode): void {
  if (isLazyComponent(children)) {
    const isZhCN = navigator.language === "zh-CN";
    const message = isZhCN
      ? '检测到 Activity 的 children 是 React.lazy() 创建的懒加载组件。由于 @ivliu/react-offscreen 在 fallback 模式下依赖 Suspense 机制，这可能导致额外的 Suspense 行为或警告。建议将 lazy 组件提升到 Activity 外部加载，或在 mode="hidden" 时避免使用懒组件。'
      : 'Detected that Activity\'s children is a LazyComponent created by React.lazy(). Since @ivliu/react-offscreen relies on Suspense mechanism in fallback mode, this may cause additional Suspense behavior or warnings. Consider loading the lazy component outside of Activity, or avoid using lazy components when mode="hidden".';
    console.warn(message);
  }
}

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
export const Activity: FC<Partial<IProps>> = (props) => {
  // props
  const { mode = "visible", children } = props;

  if (NativeActivity) {
    return <NativeActivity mode={mode}>{children}</NativeActivity>;
  }

  if (process.env.NODE_ENV !== "production" && isBrowser) {
    warnOnLazyChildren(children);
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
