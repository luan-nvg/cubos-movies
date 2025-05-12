import { useIntl } from "react-intl"
import * as S from "./styles"

export const useColumnConfig = () => {
  const intl = useIntl()

  return [
    {
      title: "Nome",
      key: "name",
      colWidth: "20%"
    },
    {
      title: "Canais",
      key: "channels",
      colWidth: "20%",
      headerRender: () => (
        <S.TitleContainer>
          {intl.formatMessage({
            id: "general.channels",
            defaultMessage: "Canais"
          })}
        </S.TitleContainer>
      )
    },
    {
      title: "Entradas",
      key: "inputs",
      colWidth: "20%",
      headerRender: () => (
        <S.TitleContainer>
          {intl.formatMessage({
            id: "general.channels.input",
            defaultMessage: "Entradas"
          })}
        </S.TitleContainer>
      )
    }
  ]
}
