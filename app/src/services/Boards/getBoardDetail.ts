import api from "@/api/axios"
import type { AxiosError } from "axios"

const getBoardDetail = async (id: string) => {
  try {
    const response = await api.get(`/boards/detail/${id}`)
    return { data: response.data, error: null }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    return {
      data: null,
      error: error?.response?.data?.message || "Error fetching board details"
    }
  }
}

export default getBoardDetail
