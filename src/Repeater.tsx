"use client";
import React, { useRef, useEffect } from "react";
import { createPromise } from "./createPromise";
import type { FC } from "react";
import type { IProps } from "./type";

export const Repeater: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const promiseRef = useRef<Promise<void> | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);
  // methods
  const resolvePromise = (force: boolean = false) => {
    if (
      (force || mode === "visible") &&
      typeof resolveRef.current === "function"
    ) {
      resolveRef.current();
      resolveRef.current = null;
      promiseRef.current = null;
    }
  };
  // effect
  useEffect(() => () => resolvePromise(true), []);

  if (mode === "hidden") {
    if (resolveRef.current === null) {
      const { promise, resolve } = createPromise<void>();

      promiseRef.current = promise;
      resolveRef.current = resolve;
    }

    const promise = promiseRef.current!;
    if ("use" in React && typeof React.use === "function") {
      (React.use as <T>(primise: Promise<T>) => T)(promise);
    } else {
      throw promise;
    }
  }

  resolvePromise();

  return children;
};
