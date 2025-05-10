import { Input, Label, Link, Toggle, Typography } from "@/components/Shared"
import * as S from "./styles"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "@/components/Button/styles"

export function RecoverPwd() {
  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.WrapperHeader>
        <Toggle size="md" onToggle={() => {}} />
        <S.ButtonST
          type="submit"
          textbutton="Cadastrar"
          icon={<S.IconAdd size={14} />}
          onClick={() => navigate("/register")}
        />
      </S.WrapperHeader>

      <S.Main>
        <S.WrapperContent>
          <Typography as="h2" size="4rem" color="#020617">
            Gerenciamento da MIP
          </Typography>
          <Typography a s="p" size="1.4rem" color="#020617">
            Para recuperar a sua senha, vamos enviar um código para o seu email
            cadastrado com o processo de recuperação da senha.
          </Typography>

          <S.FieldWrapper>
            <Label
              text="Email Cadastrado:"
              htmlFor="email"
              marginbottom="1.25rem"
              fontsize="1.6rem"
              fontweight="600"
              color="#020617"
            />
            <Input
              id="email"
              placeholder="seuemail@email.com"
              icon={<FaUser size={16} color="#020617" />}
            />
          </S.FieldWrapper>

          <S.LinksWrapper>
            <ButtonComponent type="submit" textbutton="Enviar código" />

            <S.ForgotPasswordWrapper>
              <Link children="Login" href="/login" />
            </S.ForgotPasswordWrapper>
          </S.LinksWrapper>
        </S.WrapperContent>
      </S.Main>
      <S.Footer>Desenvolvido por MIP Management</S.Footer>
    </S.Wrapper>
  )
}
