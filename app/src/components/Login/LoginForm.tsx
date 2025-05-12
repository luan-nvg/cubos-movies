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
import { useTheme } from "../../hooks/useTheme"

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

  const { theme } = useTheme()

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
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Nome/E-mail
          </Typography>

          <Input
            placeholder="Digite seu nome/E-mail"
            id="email"
            type="text"
            {...register("email")}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid", // ou use borderColor em vez de border
              borderColor: theme === "light" ? "var(--black)" : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)"
            }}
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Senha
          </Typography>

          <Input
            placeholder="Digite a sua senha"
            type="password"
            id="senha"
            {...register("password")}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid", // ou use borderColor em vez de border
              borderColor: theme === "light" ? "var(--black)" : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)"
            }}
          />
        </S.FieldWrapper>

        <S.LinksWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            // color={theme === "light" ? "var(--black)" : "var(--white)"}
            color={"var(--primary)"}
            textdecoration="underline"
          >
            Esqueci minha senha
          </Typography>

          <ButtonComponent type="submit" textbutton="Entrar" />
        </S.LinksWrapper>
      </S.Form>
    </S.Main>
  )
}
