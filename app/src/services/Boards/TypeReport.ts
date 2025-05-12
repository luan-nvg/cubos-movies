import api from "@/api/axios"
import type { AxiosError } from "axios"

const getTypeReports = async (data: any) => {
  try {
    const response = await api.post(`/types-report/all`, data)
    return { data: response.data, error: null }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>
    return {
      data: null,
      error: error?.response?.data?.message || "Error fetching type reports"
    }
  }
}

export default getTypeReports
