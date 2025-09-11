export const createPromise = <T>() => {
  if (
    "withResolvers" in Promise &&
    typeof Promise.withResolvers === "function"
  ) {
    return Promise.withResolvers<T>();
  }

  let _resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _reject: (reason?: any) => void;
  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  return {
    promise,
    resolve: _resolve!,
    reject: _reject!,
  } as PromiseWithResolvers<T>;
};
