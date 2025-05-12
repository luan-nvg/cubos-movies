import { Typography, Input, Toggle, Label } from "@/components/Shared"
import { useForm } from "react-hook-form"
import * as S from "@/pages/Register/styles"
import { IRegisterData } from "@/pages/Register/interface"
import onRegisterSubmit from "@/services/Register/Register"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { ButtonComponent } from "@/components/Button/styles"

export const Register = () => {
  const { register, handleSubmit } = useForm<IRegisterData>()

  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.WrapperHeader>
        <Toggle size="md" onToggle={() => {}} />
        <S.ButtonST
          type="submit"
          textbutton="Entrar"
          icon={<FaUser size={16} color="--white" />}
          onClick={() => navigate("/login")}
        />
      </S.WrapperHeader>
      <S.Main>
        <Typography as="h2" size="4rem" color="--black">
          Gerenciamento da MIP
        </Typography>
        <Typography a s="p" size="1.4rem" color="--black">
          Para se cadastrar no sistema, preencha os campos abaixo.
        </Typography>

        <S.Form onSubmit={handleSubmit(onRegisterSubmit)}>
          <S.FieldWrapper>
            <Label
              text="Nome:"
              htmlFor="username"
              marginbottom="1.25rem"
              fontsize="1.6rem"
              fontweight="600"
              color="--black"
            />
            <Input
              id="username"
              placeholder="Seu nome"
              icon={<FaUser size={16} color="--black" />}
              {...register("username")}
            />
          </S.FieldWrapper>
          <S.FieldWrapper>
            <Label
              text="Email:"
              htmlFor="email"
              marginbottom="1.25rem"
              fontsize="1.6rem"
              fontweight="600"
              color="--black"
            />
            <Input
              placeholder="seuemail@email.com"
              id="email"
              type="email"
              icon={<FaEnvelope size={16} color="--black" />}
              {...register("email")}
            />
          </S.FieldWrapper>
          <S.FieldWrapper>
            <Label
              text="Senha:"
              htmlFor="senha"
              marginbottom="1.25rem"
              fontsize="1.6rem"
              fontweight="600"
              color="--black"
            />
            <Input
              placeholder="Digite a sua senha"
              type="password"
              id="senha"
              color="--black"
              icon={<FaLock size={14} color="--black" />}
              {...register("password")}
            />
            <S.FieldWrapper>
              <Label
                text="Confirmar senha:"
                htmlFor="confirmarsenha"
                marginbottom="1.25rem"
                fontsize="1.6rem"
                fontweight="600"
                color="--black"
              />
              <Input
                placeholder="Repita a sua senha"
                type="password"
                id="confirmarsenha"
                color="--black"
                icon={<FaLock size={14} color="--black" />}
                {...register("repeatPassword")}
              />
            </S.FieldWrapper>
          </S.FieldWrapper>
          {/* 
          <S.SecurityPassword>
            <Typography
              as="span"
              size="1.4rem"
              color="#64748B"
              fontweight="400"
            >
              Por motivos de segurança, sua senha deve conter:
            </Typography>
            <ul>
              <li>1 letra maiúscula</li>
              <li>1 letra minúscula</li>
              <li>1 número</li>
              <li>1 caractere especial (@, #, !, $ &)</li>
            </ul>
          </S.SecurityPassword> */}

          <S.ButtonWrapper>
            <ButtonComponent
              type="submit"
              textbutton="Cadastrar"
              onClick={handleSubmit(onRegisterSubmit)}
            />
          </S.ButtonWrapper>
        </S.Form>
      </S.Main>
      <S.Footer>Desenvolvido por MIP Management</S.Footer>
    </S.Wrapper>
  )
}
