import api from "@/api/axios"

import axios from "axios"

const onLoginSubmit = async (data: any, login: (token: string) => void) => {
  const url = "users/authenticate"
  try {
    const response = await api.post(url, data)
    const token = response?.data?.data?.token
    if (token) {
      login(token)
      window.location.href = "/boards"
    } else {
      throw new Error("Token não gerado...")
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error) && error.response) {
      throw error // Lance o erro diretamente
    } else {
      throw new Error("Erro inesperado. Tente novamente mais tarde.")
    }
  }
}

export default onLoginSubmit
