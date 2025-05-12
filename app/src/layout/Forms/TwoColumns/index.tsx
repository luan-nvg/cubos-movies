import * as S from "./styles"
import { Props } from "./types";

export function FormTwoColumns ({ firstCol, secondCol, button } : Props) {
  return (
		<S.FormWrapper>
			<div className="form-sections">
				<S.FormSection>{firstCol}</S.FormSection>
				<S.FormSection>{secondCol}</S.FormSection>
			</div>
			{button}
		</S.FormWrapper>
  );
}