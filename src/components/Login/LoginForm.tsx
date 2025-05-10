import { useState } from "react"
import { Typography } from "@/components/Shared"
import Input from "../InputComponent"
import { useForm } from "react-hook-form"
import { ILoginData } from "./interface"
import * as S from "./styles"
import onLoginSubmit from "@/services/Auth/Auth"
import { ButtonComponent } from "@/components/Button/styles"
import { useAuth } from "@/contexts/AuthContext"
import AnimatedAlert from "@/components/Alert/AnimatedAlert"
import axios from "axios"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    // setError,
    clearErrors,
    formState: { errors }
  } = useForm<ILoginData>()
  const { login } = useAuth()
  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async (data: ILoginData) => {
    if (!data.email || !data.password) {
      setAlert({
        message: "Por favor, preencha todos os campos.",
        type: "warning"
      })
      return
    }

    if (!validateEmail(data.email)) {
      setAlert({
        message: "Por favor, insira um email válido.",
        type: "warning"
      })
      return
    }

    clearErrors("email")

    try {
      await onLoginSubmit(
        {
          ...data,
          username: data.email
        },
        login
      )
      setAlert({ message: "Login efetuado com sucesso!", type: "success" })
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.data) {
        setAlert({ message: error.response.data.message, type: "error" })
      } else {
        setAlert({
          message: "Erro inesperado. Tente novamente mais tarde.",
          type: "error"
        })
      }
    }
  }

  return (
    <S.Main>
      <Typography as="h2" size="4rem" color="#020617">
        Login Conta
      </Typography>
      <h3>Digite seu nome de usuário e senha</h3>

      {alert && (
        <AnimatedAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {errors.email && errors.email.message && (
        <AnimatedAlert
          message={errors.email.message.toString()}
          type="error"
          onClose={() => clearErrors("email")}
        />
      )}

      <S.Form onSubmit={handleSubmit(handleLogin)}>
        <S.FieldWrapper>
          <Input
            placeholder="seuemail@email.com"
            id="email"
            type="text"
            {...register("email")}
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <Input
            placeholder="Digite a sua senha"
            type="password"
            id="senha"
            {...register("password")}
          />
        </S.FieldWrapper>

        <S.LinksWrapper>
          <ButtonComponent type="submit" textbutton="Entrar" />
        </S.LinksWrapper>
      </S.Form>
    </S.Main>
  )
}
