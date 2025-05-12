import api from "../../api/axios"
const endpoint = "/category"

const categoryService = {
  getCategories: async (page: number, limit: number) => {
    try {
      const response = await api.get(endpoint, {
        params: {
          page,
          limit
        }
      })
      return response.data.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao buscar categorias"
      }
    }
  },

  createCategory: async (categoryData: any) => {
    try {
      const response = await api.post(`${endpoint}/create`, categoryData)
      return response.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao cadastrar categoria"
      }
    }
  },

  updateCategory: async (categoryId: string, categoryData: any) => {
    try {
      const response = await api.put(`${endpoint}`, {
        ...categoryData,
        categoryId
      })
      return response.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao atualizar categoria"
      }
    }
  },

  deleteCategory: async (categoryId: any) => {
    try {
      const response = await api.delete(`${endpoint}`, {
        data: { categoryId } // Enviando apenas categoryData
      })
      return response.data
    } catch (error: any) {
      console.error("Erro ao deletar a categoria:", error) // Logar o erro para depuração
      return {
        error: error.response?.data?.message || "Erro ao deletar categoria"
      }
    }
  }
}

export default categoryService
