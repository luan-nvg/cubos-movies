import { LoginForm } from "./LoginForm"
import { LoginProps } from "./interface"
import * as S from "./styles"

export const Login = ({ banner }: LoginProps) => {
  return (
    <S.PageWrapper>
      {banner && (
        <S.BannerWrapper>
          <S.Banner src={banner} alt="Banner" />
        </S.BannerWrapper>
      )}
      <S.FormSection banner={banner}>
        <S.Wrapper>
          <S.WrapperHeader>
            {/* <S.RegisterNewAccount>
              Não tem uma conta ainda? <Link to="/register">Inscrever-se!</Link>{" "}
              <img src="/src/assets/images/br-flag.svg" alt="brandeira" />
            </S.RegisterNewAccount> */}
          </S.WrapperHeader>
          <S.FormWrapper>
            <LoginForm />
          </S.FormWrapper>
          <S.Footer>
            2025 © Todos os direitos reservados a Cubos Movies
          </S.Footer>
        </S.Wrapper>
      </S.FormSection>
    </S.PageWrapper>
  )
}

export default Login
