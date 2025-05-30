import { JSX } from "hono/jsx/jsx-runtime";

export interface IconProps {
  color?: string;
}

export type Icon = (props: IconProps) => JSX.Element;