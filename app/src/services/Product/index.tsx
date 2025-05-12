import api from "../../api/axios"
const endpoint = "/product"

const productService = {
  getProducts: async (page: number, limit: number) => {
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
        error: error.response.data.error || "Erro ao buscar produtos"
      }
    }
  },

  registerProduct: async (productData: any) => {
    try {
      const response = await api.post(`${endpoint}/create`, productData)
      return response.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao cadastrar produto"
      }
    }
  },

  deleteProduct: async (productId: string) => {
    try {
      const response = await api.delete(`${endpoint}/${productId}`)
      return response.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao deletar produto"
      }
    }
  },

  updateProduct: async (productId: string, productData: any) => {
    try {
      const response = await api.put(`${endpoint}`, {
        ...productData,
        productId
      })
      return response.data
    } catch (error: any) {
      return {
        error: error.response.data.error || "Erro ao atualizar categoria"
      }
    }
  }
}

export default productService
