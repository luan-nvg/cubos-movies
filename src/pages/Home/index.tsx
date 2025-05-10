import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import Table from "@/components/Table";
import { FaCalendarCheck } from "react-icons/fa";

import { useTitle } from "@/contexts/TitleContext";
import { SectionTitle } from "@/components/SectionTitle";

const tableData: any = [
  {
    selected: false,
    firstCol: "Luan Cerqueira",
    secondCol: "QA",
    thirdCol: "#000",
    more_actions: false,
  },
  {
    selected: false,
    firstCol: "Kayo Enrique",
    secondCol: "Front-End",
    thirdCol: "#000",
    more_actions: false,
  },
  {
    selected: false,
    firstCol: "Sarah Schneider",
    secondCol: "Front-End",
    thirdCol: "#000",
    more_actions: false,
  },
  {
    selected: false,
    firstCol: "Samuel Santos",
    secondCol: "Front-End",
    thirdCol: "#000",
    more_actions: false,
  },
];

const columnConfig = [
  { title: "Nome", key: "firstCol", colWidth: "10%" },
  { title: "Time", key: "secondCol", colWidth: "10%" },
  { title: "Task", key: "thirdCol", colWidth: "10%" },
];

export const Home = () => {
  //const [currentPage, setCurrentPage] = useState(1);
  //const [currentProjects, setCurrentProjects] = useState<IProject[]>([]);
  const [localDate, setLocalDate] = useState(new Date());
  const navigate = useNavigate();

  function handleClick(link: string) {
    navigate(link);
  }

  /*const handleChangeData = (newPage: number) => {
    setCurrentPage(newPage);
  };*/

  useEffect(() => {
    const updateDate = () => {
      setLocalDate(new Date());
    };

    updateDate();

    return () => {};
  }, []);

  const { setTitle } = useTitle(); // Usa o contexto de título
  useEffect(() => {
    setTitle("Home"); // Define o título da página
  }, [setTitle]);
  return (
    <>
      <S.SubtitleWrapper>
        <SectionTitle title="MIP Management" fontSize="var(--lg)" />
        <S.RightWrapper>
          {<FaCalendarCheck size={14} color="#2E1065" />}
          <S.LocalDate>
            {localDate.toLocaleDateString("pt-BR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </S.LocalDate>
          <S.NewProjectButton
            textbutton="Adicionar ao Projeto"
            onClick={() => handleClick("/project")}
          />
        </S.RightWrapper>
      </S.SubtitleWrapper>

      <S.DashBoard>
        <S.DashboardCard>
          <S.TitleCard>{"Tasks Completas"}</S.TitleCard>
        </S.DashboardCard>
        <S.TableWrapper>
          <S.TableHead>
            <S.TitleTable>{"Equipes"}</S.TitleTable>
          </S.TableHead>
          <Table
            data={tableData}
            tableColumns={columnConfig.map((col) => {
              return {
                ...col,
                alignrow: "left",
                aligncolumn: "left",
                widthpercentage: col.colWidth,
              };
            })}
          />
        </S.TableWrapper>

        <S.DashboardBurndown>
          <S.TitleCard>{"Gráfico de Burndown"}</S.TitleCard>
        </S.DashboardBurndown>
      </S.DashBoard>
    </>
  );
};

// código anterior //
/*
import { SectionTitle } from "@/components/SectionTitle";

export const Home = () => {
	return (
		<>
			<SectionTitle
				title="Bem-vindo(a), (nome fornecido no cadastro)"
				subtitle="Para ativar sua conta, complete o seu perfil com os dados pessoais. E não precisa se preocupar, esses dados são protegidos!"
			/>
		</>
	);
}
*/
