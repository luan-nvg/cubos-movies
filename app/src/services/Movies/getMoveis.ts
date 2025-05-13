import api from "@/api/axios"

const getMovies = async (
  pageNumber = 1,
  pageSize = 10,
  searchParams = { id: "", title: "" },
  filters = {
    minDuration: "",
    maxDuration: "",
    startDate: "",
    endDate: "",
    genre: ""
  }
) => {
  const url = "/movies"

  try {
    const response = await api.get(url, {
      params: {
        page: pageNumber,
        limit: pageSize,
        search: searchParams.title, // Enviando apenas o título como string de busca
        ...(searchParams.id && { id: searchParams.id }),
        ...(filters.minDuration && { minDuration: filters.minDuration }),
        ...(filters.maxDuration && { maxDuration: filters.maxDuration }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.genre && { genre: filters.genre })
      }
    })

    const movies = response?.data
    console.log("movies:", movies)
    return movies
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}

export default getMovies
