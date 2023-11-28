import React, { useRef, useEffect } from 'react';
import type { FC } from 'react';
import type { IProps } from './type';

export const Repeater: FC<IProps> = (props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef<() => void>();
  // methods
  const resolvePromise = (ignoreMode?: boolean) => {
    if ((ignoreMode || mode === 'visible') && typeof resolveRef.current === 'function') {
      resolveRef.current();
      resolveRef.current = void 0;
    }
  }
  // effect
  useEffect(() => () => resolvePromise(true), []);

  if (mode === 'hidden' && typeof resolveRef.current === 'undefined') {
    throw new Promise<void>((resolve) => (resolveRef.current = resolve));
  }

  // warning
  if(mode === 'hidden') {
    console.error(
      navigator.language === 'zh-CN' ? `
        由于react的限制，由startTransition或者useDeferredValue触发的更新引起的组件挂起不会渲染回退，具体可以参考
        https://zh-hans.react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding
      ` : `
      Due to the limitations of react, component suspension caused by updates triggered by startTransition or useDeferredValue will not render the rollback. For details, please refer to
      https://zh-hans.react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding
      `
    )
  }

  resolvePromise();

  return <>{children}</>;
};
