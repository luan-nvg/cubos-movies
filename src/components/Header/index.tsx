import * as S from "./styles"

import { useTitle } from "@/contexts/TitleContext" // Importa o contexto
import { Divider } from "@/components/Divider" // Importa o Divider
import Breadcrumb from "../Breadcrumb"
import { Button } from "@/components/Shared"
import ThemeToggle from "@/components/ThemeToggle"
import onLogout from "@/services/Auth/Logout"

export function Header() {
  const { title } = useTitle() // Obtém o título do contexto

  return (
    <S.Wrapper>
      <S.ProfileDiv>
        {/* <S.SwitchTheme size="sm" />
        <S.Profile onClick={handleClick} /> */}
      </S.ProfileDiv>
      <Divider /> {/* Linha cinza separadora */}
      <S.headSectionWrapper>
        <S.titleWrapper>
          <S.Title>{title}</S.Title>
          <Breadcrumb title={title} />
        </S.titleWrapper>
        <S.rightSection>
          <ThemeToggle />
          <Button
            textbutton="Logout"
            bgcolor={"var(--primary)"}
            textcolor={"var(--white)"}
            onClick={() => {
              onLogout()
              window.location.href = "/login"
            }}
          />
        </S.rightSection>
      </S.headSectionWrapper>
    </S.Wrapper>
  )
}
