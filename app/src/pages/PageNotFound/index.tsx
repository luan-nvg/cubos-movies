import { SectionTitle } from "@/components/SectionTitle";
import { useNavigate } from "react-router-dom";
import * as S from './styles';
import { FaChevronLeft } from "react-icons/fa";

export const PageNotFound = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
		<>
			<SectionTitle
				title="Página Não Encontrada"
				subtitle={
					<S.Subtitle>
						Opa, parece que você desbloqueou uma feature que ainda
						não foi desenvolvida!
					</S.Subtitle>
				}
			/>
			<S.ButtonWrapper>
				<S.ButtonBack
					textbutton="Voltar"
					onClick={handleClick}
					icon={<FaChevronLeft size={16} />}
				/>
			</S.ButtonWrapper>
		</>
  );
}
