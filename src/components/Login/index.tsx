import { LoginForm } from "./LoginForm"
import { LoginProps } from "./interface"
import * as S from "./styles"

export const Login = ({ banner }: LoginProps) => {
  return (
    <S.Container>
      <S.PageWrapper>
        {banner && (
          <S.BannerWrapper>
            <S.Banner src={banner} />
          </S.BannerWrapper>
        )}
        <S.FormSection banner={banner}>
          <S.Wrapper>
            <S.WrapperHeader>
              {/* Conteúdo do header se necessário */}
            </S.WrapperHeader>
            <S.FormWrapper>
              <LoginForm />
            </S.FormWrapper>
          </S.Wrapper>
        </S.FormSection>
      </S.PageWrapper>

      <S.Footer>2025 © Todos os direitos reservados a Cubos Movies</S.Footer>
    </S.Container>
  )
}

export default Login
