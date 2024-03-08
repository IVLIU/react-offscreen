/**
 * @description determine whether it is a browser environment
 */
export const canUseDOM = () =>
  !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
