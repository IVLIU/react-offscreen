import React, { useRef, useEffect } from "react";
import type { FC } from "react";
import type { IProps } from "./type";

export const Repeater: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const promiseRef = useRef<Promise<void> | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);
  // methods
  const resolvePromise = (ignoreMode?: boolean) => {
    if (
      (ignoreMode || mode === "visible") &&
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
    if(resolveRef.current === null) {
      promiseRef.current = new Promise<void>(
        (resolve) => (resolveRef.current = resolve),
      );
    }

    const promise = promiseRef.current!;
    // @ts-ignore
    if ("use" in React && typeof React.use === "function") {
      // @ts-ignore
      (React.use as <T>(primise: Promise<T>) => T)(promise);
    } else {
      throw promise;
    }
  }

  resolvePromise();

  return <>{typeof children === 'function' ? children(mode) : children}</>;
};
