import type { ReactNode } from 'react';

export type OffscreenMode = 'visible' | 'hidden';

export interface IProps {
  mode: OffscreenMode;
  children: ReactNode;
}