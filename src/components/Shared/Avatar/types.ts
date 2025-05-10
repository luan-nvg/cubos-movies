import { ReactNode } from "react";

export interface TextObject {
  content: ReactNode | string;
  className?: string;
}

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  border?: boolean;
  src?: string;
  size?: string;
  alt?: string;
  text?: string | TextObject;
  onClick?: () => void;
  textcolor?: string;
  textunderline?: string;
  textbold?: string;
}
