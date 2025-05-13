import { useState } from "react"
import { Typography } from "@/components/Shared"
import Input from "../InputComponent"
import { useForm } from "react-hook-form"
import * as S from "./styles"
import onLoginSubmit from "@/services/Auth/AuthRegister"
import { ButtonComponent } from "@/components/Button/styles"
import { useAuth } from "@/contexts/AuthContext"
import AnimatedAlert from "@/components/Alert/AnimatedAlert"
import axios from "axios"
import { useTheme } from "../../hooks/useTheme"

// Updated interface to include name and passwordConfirmation
interface ILoginData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<ILoginData>()
  const { login } = useAuth()
  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const { theme } = useTheme()

  // Watch password field for comparison
  const password = watch("password")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async (data: ILoginData) => {
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.passwordConfirmation
    ) {
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

    if (data.password.length < 6) {
      setAlert({
        message: "A senha deve ter pelo menos 6 digitos",
        type: "error"
      })
      return
    }

    if (data.password !== data.passwordConfirmation) {
      setAlert({
        message: "As senhas não coincidem.",
        type: "error"
      })
      return
    }

    clearErrors()

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
        setAlert({ message: error.response.data.error, type: "error" })
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
        {/* New Name field */}
        <S.FieldWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Nome
          </Typography>

          <Input
            placeholder="Digite seu nome completo"
            id="name"
            type="text"
            {...register("name")}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid",
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
            E-mail
          </Typography>

          <Input
            placeholder="Digite seu E-mail"
            id="email"
            type="text"
            {...register("email")}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid",
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
              border: "2px solid",
              borderColor: theme === "light" ? "var(--black)" : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)"
            }}
          />
        </S.FieldWrapper>

        {/* New Password Confirmation field */}
        <S.FieldWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Confirmar Senha
          </Typography>

          <Input
            placeholder="Confirme a sua senha"
            type="password"
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid",
              borderColor: theme === "light" ? "var(--black)" : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)"
            }}
          />
        </S.FieldWrapper>

        <S.LinksWrapper>
          <ButtonComponent type="submit" textbutton="Cadastrar" />
        </S.LinksWrapper>
      </S.Form>
    </S.Main>
  )
}
