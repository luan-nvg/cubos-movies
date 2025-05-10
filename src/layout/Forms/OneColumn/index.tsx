import * as S from "./styles";
import { Props } from "./types";

export function FormOneColumn({ children, onSubmit }: Props) {
  return <S.FormWrapper onSubmit={onSubmit}>{children}</S.FormWrapper>;
}
