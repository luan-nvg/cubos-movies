import api from "@/api/axios"

const createMoveis = async data => {
  const url = "/movies"

  try {
    const response = await api.post<any>(url, data)
    const movies: any = response?.data
    console.log("movies:", movies)
    return movies
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}

export default createMoveis
