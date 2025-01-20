import type { ReactNode } from "react";

export type ActivityMode = "visible" | "hidden";

/**
 * @deprecated
 */
export type OffscreenMode = ActivityMode;

export interface IProps {
  mode: ActivityMode;
  children: ReactNode;
}
