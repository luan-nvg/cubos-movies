import api from "../../api/axios"
import type { IUser } from "./IUser"

// Função para buscar todos os usuários
const onAllUsers = async (query: string) => {
  const url = `/user/search` // Rota para buscar os usuários

  try {
    // Realizar a requisição para pegar os usuários
    const response = await api.get<{ data: IUser[] }>(url, {
      params: { q: query } // Passando a query como parâmetro de busca
    })

    // Logar o conteúdo da resposta antes de manipular
    console.log("Resposta da API:", response)

    // Verificar se a resposta contém a propriedade `data` e é um array
    if (response.data && Array.isArray(response.data)) {
      const users = response.data.map(user => ({
        _id: user._id, // ID do usuário
        username: user.username, // Nome de usuário
        email: user.email // Email do usuário
      }))

      console.log("Usuários:", users) // Log dos usuários mapeados
      return users
    } else {
      console.error("Resposta da API não contém dados válidos:", response.data)
      return [] // Retorna um array vazio em caso de dados inválidos
    }
  } catch (error) {
    console.error("Erro na API:", error)
    return null
  }
}

export { onAllUsers }
