import { useIntl } from "react-intl"
import * as S from "./styles"
import { OverlayTrigger } from "@/components/WaterMonitoring/Tooltip"
import { ReservoirLevel } from "@/components/WaterMonitoring/ReservoirLevel"
import SVGQuestionCircle from "@/components/WaterMonitoring/SVGQuestionCircle"

export const useColumnConfig = () => {
  const intl = useIntl()

  return [
    {
      title: "Nome",
      key: "name",
      colWidth: "20%"
    },
    {
      title: "Monitoramento",
      key: "monitoring",
      colWidth: "20%"
    },
    {
      title: "Reservatório",
      key: "reservoir",
      colWidth: "20%",
      headerRender: () => (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={
              <S.StyledReservoirTooltip id="reservoir-tooltip">
                <S.TooltipRow>
                  <ReservoirLevel
                    widthAq="100%"
                    heightAq="100%"
                    value="Max"
                    widthQd="15px"
                    borderRadius={"12px"}
                  />
                  <S.TooltipTextSpan>
                    {intl.formatMessage({
                      id: "general.lvl.green",
                      defaultMessage: "Nível Normal"
                    })}
                  </S.TooltipTextSpan>
                </S.TooltipRow>
                <S.TooltipRow>
                  <ReservoirLevel
                    widthAq="100%"
                    heightAq="100%"
                    value="-Max"
                    widthQd="15px"
                    borderRadius={"12px"}
                  />
                  <S.TooltipTextSpan>
                    {intl.formatMessage({
                      id: "general.lvl.yellow",
                      defaultMessage: "Nível de Atenção"
                    })}
                  </S.TooltipTextSpan>
                </S.TooltipRow>
                <S.TooltipRow>
                  <ReservoirLevel
                    widthAq="100%"
                    heightAq="100%"
                    value="Min"
                    widthQd="15px"
                    borderRadius={"12px"}
                  />
                  <S.TooltipTextSpan>
                    {intl.formatMessage({
                      id: "general.lvl.pumpkin",
                      defaultMessage: "Nível Baixo"
                    })}
                  </S.TooltipTextSpan>
                </S.TooltipRow>
                <S.TooltipRow>
                  <ReservoirLevel
                    widthAq="100%"
                    heightAq="100%"
                    value="-Min"
                    widthQd="15px"
                    borderRadius={"12px"}
                  />
                  <S.TooltipTextSpan>
                    {intl.formatMessage({
                      id: "general.lvl.red",
                      defaultMessage: "Nível Crítico"
                    })}
                  </S.TooltipTextSpan>
                </S.TooltipRow>
              </S.StyledReservoirTooltip>
            }
          >
            <span>
              {intl.formatMessage({
                id: "general.water.reservoir",
                defaultMessage: "Reservatório"
              })}
              <S.SvgQuestionContainer>
                <SVGQuestionCircle />
              </S.SvgQuestionContainer>
            </span>
          </OverlayTrigger>
        </div>
      )
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
