import { effect } from './OffScreen';
import type { EffectCallback } from 'react';

export const useActivated = (callback: EffectCallback) => {
  if(effect.current === null) {
    return;
  }
  effect.current.add(callback);
}