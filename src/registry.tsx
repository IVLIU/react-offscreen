import { Activity, Offscreen } from "./Activity";
import type { ReactNode } from "react";
import type { UIElement, VisibilityCondition } from "@json-render/core";
import { IProps } from "./type";

interface ComponentProps {
  element: {
    key: string;
    type: string;
    props: IProps;
    children?: UIElement[];
    visible?: VisibilityCondition;
    validation?: unknown;
  };
  children?: ReactNode; // Rendered children
  onAction: (name: string, params: object) => void;
}

export const registry = {
  Activity: ({ element, children }: ComponentProps) => (
    <Activity mode={element.props.mode}>{children}</Activity>
  ),
  Offscreen: ({ element, children }: ComponentProps) => (
    <Offscreen mode={element.props.mode}>{children}</Offscreen>
  ),
};
