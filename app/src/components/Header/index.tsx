import * as S from "./styles"
import { useTitle } from "@/contexts/TitleContext" // Importa o contexto
import { Divider } from "@/components/Divider" // Importa o Divider
import { Button } from "@/components/Button"
import ThemeToggle from "@/components/ThemeToggle"
import onLogout from "@/services/Auth/Logout"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/contexts/AuthContext" // Importe o contexto de autenticação

import Logo from "@/components/Logo" // Importa o Divider

export function Header() {
  const { title } = useTitle() // Obtém o título do contexto
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth() // Obtém o estado de autenticação

  return (
    <>
      <S.Wrapper theme={theme}>
        <S.headSectionWrapper>
          <S.titleWrapper>
            <S.Title>
              <Logo />
            </S.Title>
          </S.titleWrapper>
          <S.rightSection>
            <ThemeToggle />
            {isAuthenticated && ( // Renderiza o botão apenas se autenticado
              <Button
                textbutton="Logout"
                bgcolor={"var(--primary)"}
                textcolor={"var(--white)"}
                onClick={() => {
                  onLogout()
                  window.location.href = "/login"
                }}
              />
            )}
          </S.rightSection>
        </S.headSectionWrapper>
        <Divider />
      </S.Wrapper>
    </>
  )
}
