import * as S from "./styles";
import {
  FaBriefcase,
  FaCalendar,
  FaCheck,
  FaClock,
  FaGithub,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";
import { SectionTitle } from "@/components/SectionTitle";
import { useNavigate } from "react-router-dom";

export function OnBoarding() {
  const navigate = useNavigate();

  function handleConfirm() {
    navigate("/");
  }

  return (
    <>
      <SectionTitle
        title="Bem-vindo(a), (nome fornecido no cadastro)"
        subtitle={
          <S.Subtitle>
            Para ativar sua conta, complete o seu perfil com os dados pessoais.
            E não precisa se preocupar, esses dados são protegidos!
          </S.Subtitle>
        }
      />
      <S.FormWrapper
        firstCol={
          <S.FormSections>
            <S.FormSectionTitle>Dados Pessoais</S.FormSectionTitle>
            <S.FormItem
              labelinput={{
                label: {
                  text: "Telefone para Contato",
                },
                input: {
                  id: "phoneNumber",
                  placeholder: "(xx) xxxxx-xxxx",
                  icon: <FaPhone color="#020617" size={14} />,
                  type: "tel",
                },
              }}
            />
            <S.FormItem
              labelinput={{
                label: {
                  text: "Nome de Usuário do Github",
                },
                input: {
                  id: "github-username",
                  placeholder: "@github-usersname",
                  icon: <FaGithub color="#020617" size={14} />,
                  type: "text",
                },
              }}
            />
            <S.FormItem
              labelinput={{
                label: {
                  text: "Link do Perfil do LinkedIn",
                },
                input: {
                  id: "linkedin-profile",
                  placeholder: "https://www.linkedin.com/in/linkedin-username",
                  icon: <FaLinkedinIn color="#020617" size={14} />,
                  type: "url",
                },
              }}
            />
            <S.FormDropdown
              labeldropdown={{
                label: {
                  text: "Experiência Profissional",
                  fontsize: "1.6rem",
                  fontweight: "600",
                },
                dropdown: {
                  onSelect: () => {
                    console.log();
                  },
                  icon: <FaBriefcase color="#020617" size={22} />,
                  widthbutton: "100%",
                  borderbutton: "1px solid #020617",
                  bgcolor: "#E2E8F0",
                  paddingbutton: ".8rem 1.2rem",
                  fontweightsection: "600",
                  titledropdown: "Selecione seu  nível atual",
                  sections: [
                    {
                      titlelabel: "Experiência Profissional:",
                      options: [
                        {
                          value: "junior",
                          label: "Júnior",
                        },
                        {
                          value: "midlevel",
                          label: "Pleno",
                        },
                        {
                          value: "senior",
                          label: "Sênior",
                        },
                      ],
                    },
                  ],
                },
              }}
            />
          </S.FormSections>
        }
        secondCol={
          <S.FormSections>
            <S.FormSectionTitle>Disponibilidade</S.FormSectionTitle>
            <S.FormDropdown
              labeldropdown={{
                label: {
                  text: "Dias Disponíveis:",
                  fontsize: "1.6rem",
                  fontweight: "600",
                },
                dropdown: {
                  onSelect: () => {},
                  icon: <FaCalendar color="#020617" size={22} />,
                  widthbutton: "100%",
                  borderbutton: "1px solid #020617",
                  bgcolor: "#E2E8F0",
                  paddingbutton: ".8rem 1.2rem",
                  fontweightsection: "600",
                  titledropdown: "Selecione os seus dias disponíveis",
                  sections: [
                    {
                      titlelabel: "Dias da Semana",
                      options: [
                        {
                          value: "monday",
                          label: "Segunda-Feira",
                        },
                        {
                          value: "tuesday",
                          label: "Terça-Feira",
                        },
                        {
                          value: "wednesday",
                          label: "Quarta-Feira",
                        },
                        {
                          value: "thursday",
                          label: "Quinta-Feira",
                        },
                        {
                          value: "friday",
                          label: "Sexta-Feira",
                        },
                      ],
                    },
                    {
                      titlelabel: "Finais de Semana",
                      options: [
                        {
                          value: "saturday",
                          label: "Sábado",
                        },
                        {
                          value: "sunday",
                          label: "Domingo",
                        },
                      ],
                    },
                  ],
                },
              }}
            />
            <S.FormDropdown
              labeldropdown={{
                label: {
                  text: "Horários Disponíveis:",
                  fontsize: "1.6rem",
                  fontweight: "600",
                },
                dropdown: {
                  onSelect: () => {},
                  icon: <FaClock color="#020617" size={22} />,
                  widthbutton: "100%",
                  borderbutton: "1px solid #020617",
                  bgcolor: "#E2E8F0",
                  paddingbutton: ".8rem 1.2rem",
                  fontweightsection: "600",
                  titledropdown: "Selecione os seus horários disponíveis",
                  sections: [
                    {
                      titlelabel: "Manhã",
                      options: [
                        {
                          value: "09",
                          label: "09h00",
                        },
                        {
                          value: "10",
                          label: "10h00",
                        },
                        {
                          value: "11",
                          label: "11h00",
                        },
                        {
                          value: "12",
                          label: "12h00",
                        },
                      ],
                    },
                    {
                      titlelabel: "Tarde",
                      options: [
                        {
                          value: "13",
                          label: "13h00",
                        },
                        {
                          value: "14",
                          label: "14h00",
                        },
                        {
                          value: "15",
                          label: "15h00",
                        },
                        {
                          value: "16",
                          label: "16h00",
                        },
                        {
                          value: "17",
                          label: "17h00",
                        },
                      ],
                    },
                    {
                      titlelabel: "Noite",
                      options: [
                        {
                          value: "18",
                          label: "18h00",
                        },
                        {
                          value: "19",
                          label: "19h00",
                        },
                        {
                          value: "20",
                          label: "20h00",
                        },
                        {
                          value: "21",
                          label: "21h00",
                        },
                        {
                          value: "22",
                          label: "22h00",
                        },
                      ],
                    },
                  ],
                },
              }}
            />
          </S.FormSections>
        }
        button={
          <S.SendButton
            textbutton="Confirmar"
            icon={<FaCheck size={16} />}
            onClick={handleConfirm}
          />
        }
      />
    </>
  );
}
