import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  onSubmit?: () => void;
}
