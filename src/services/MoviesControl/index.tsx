import api from "@/api/axios"

/**
 * Fetches all movies with pagination
 * @param {number} page - The current page number
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} - Promise resolving to the movies data
 */
const getAllMovies = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/movies?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw error
  }
}

/**
 * Fetches a single movie by ID
 * @param {string} id - The movie ID
 * @returns {Promise<Object>} - Promise resolving to the movie data
 */
const getMovieById = async id => {
  try {
    const response = await api.get(`/movies/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error)
    throw error
  }
}

/**
 * Search for movies by title
 * @param {string} query - Search query
 * @param {number} page - The current page number
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} - Promise resolving to the movies data
 */
const searchMovies = async (query: any, page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/movies/search?q=${query}&page=${page}&limit=${limit}`
    )
    return response.data
  } catch (error) {
    console.error("Error searching movies:", error)
    throw error
  }
}

// For mock testing without an API
const getMockMovies = (page = 1, limit = 10) => {
  // Mock data
  const mockMovies = [
    {
      id: "1",
      title: "Bumblebee",
      rating: 67,
      image: "/images/bumblebee.jpg",
      year: 2018
    },
    {
      id: "2",
      title: "Capita Marvel",
      rating: 79,
      image: "/images/capitamarvel.jpg",
      year: 2019
    },
    {
      id: "3",
      title: "Alta Ação de Combate",
      rating: 70,
      image: "/images/altaacao.jpg",
      year: 2021
    },
    {
      id: "4",
      title: "Como Treinar o Seu Dragão 3",
      rating: 88,
      image: "/images/dragao3.jpg",
      year: 2019
    },
    {
      id: "5",
      title: "Aquaman",
      rating: 74,
      image: "/images/aquaman.jpg",
      year: 2018
    },
    {
      id: "6",
      title: "O Menino que Queria Ser Rei",
      rating: 72,
      image: "/images/reiarturo.jpg",
      year: 2019
    },
    {
      id: "7",
      title: "Megarromântico",
      rating: 69,
      image: "/images/megaromantico.jpg",
      year: 2019
    }
  ]

  // Simulate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedMovies = mockMovies.slice(startIndex, endIndex)

  // Simulate API response
  return {
    entities: paginatedMovies,
    totalCount: mockMovies.length
  }
}

export default {
  getAllMovies,
  getMovieById,
  searchMovies,
  getMockMovies
}
