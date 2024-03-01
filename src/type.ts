import type { ReactNode } from 'react';

export type ActivityMode = 'visible' | 'hidden';

export interface IProps {
  mode: ActivityMode;
  children: ReactNode | ((mode: ActivityMode) => ReactNode);
}