import api from "@/api/axios"

const getMoveis = async (pageNumber = 1, pageSize = 10) => {
  const url = "/movies"
  const data = {
    search: {
      id: "",
      title: ""
    },
    page: pageNumber,
    limit: pageSize
  }

  try {
    const response = await api.get<any>(url, data)
    const movies: any = response?.data
    console.log("movies:", movies)
    return movies
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}

export default getMoveis
