import axios from "axios"

const BASE_URL = "http://10.0.0.114:3001/api/v1"

export const projectService = {
  getProjectLists: async (projectId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/lists?projectId=${projectId}`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar listas do projeto:", error)
    }
  }
}

export default projectService
