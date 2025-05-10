import * as S from "./styles"
import { Props } from "./interface"
import { useTheme } from "../../hooks/useTheme"

export function SectionTitle({ title, subtitle, fontSize, color }: Props) {
  const { theme } = useTheme()

  return (
    <S.SectionHeader>
      <S.PageTitle color={color} fontSize={fontSize} theme={theme}>
        {title}
      </S.PageTitle>
      {/* <S.Divider /> */}
      {subtitle}
    </S.SectionHeader>
  )
}
