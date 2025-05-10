import { SectionTitle } from "@/components/SectionTitle";
import { useEffect } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import {
  FaFlipboard,
  FaListUl,
  FaSitemap,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useTitle } from "@/contexts/TitleContext";

export function Settings() {
  const navigate = useNavigate();

  function handleClick(link: string) {
    navigate(link);
  }

  const { setTitle } = useTitle(); // Usa o contexto de título
  useEffect(() => {
    setTitle("Configurações"); // Define o título da página
  }, [setTitle]);
  return (
    <>
      <SectionTitle
        title="Configurações"
        subtitle={
          <S.SubtitleWrapper>
            <S.NewProject
              textbutton="Novo Projeto"
              onClick={() => handleClick("/project/new")}
            />
          </S.SubtitleWrapper>
        }
      />

      <S.Wrapper>
        <S.RedirectSettings
          textbutton="Editar Equipes"
          onClick={() => handleClick("/teams/edit")}
          icon={<FaUsers size={16} />}
        />

        <S.RedirectSettings
          textbutton="Editar Tarefas"
          onClick={() => handleClick("/tasks/edit")}
          icon={<FaListUl size={16} />}
        />

        <S.RedirectSettings
          textbutton="Editar Perfil"
          onClick={() => handleClick("/profile/edit")}
          icon={<FaUser size={16} />}
        />

        <S.RedirectSettings
          textbutton="Ver Projetos"
          onClick={() => handleClick("/project")}
          icon={<FaSitemap size={16} />}
        />

        <S.RedirectSettings
          textbutton="Ver Quadro Kanban"
          onClick={() => handleClick("/board")}
          icon={<FaFlipboard size={16} />}
        />
      </S.Wrapper>
    </>
  );
}
