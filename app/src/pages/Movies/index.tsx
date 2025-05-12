import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"
import getMoveis from "@/services/movies/getMoveis"
import { useIntl } from "react-intl"
import MoviesGrid from "@/components/MoviesGrid"
import TablePagination from "@/components/TablePagination"
import { useTitle } from "@/contexts/TitleContext"
import { TableDataItem, IBoard } from "./interface"
import FilterModal, { FilterFormData } from "./components/FilterModal"
import AddMovieModal, { MovieFormData } from "./components/AddMovieModal"

const Movies = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentMovies, setCurrentMovies] = useState<IBoard[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsOnPage, setItemsOnPage] = useState(0)
  const { setTitle } = useTitle()
  const navigate = useNavigate()
  const intl = useIntl()

  // Filter modal state
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  // Add movie modal state
  const [isAddMovieModalVisible, setIsAddMovieModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pass current page to API call
        const response = await getMoveis(currentPage, itemsPerPage)

        // Get projects array and totalCount from response
        let movies = []
        let totalCount = 0

        if (response && response.movies && Array.isArray(response.movies)) {
          movies = response.movies
          totalCount = response?.totalCount || movies.length
        } else if (Array.isArray(response)) {
          movies = response
          totalCount = response.length
        }

        // Calculate total pages based on totalCount from API
        const total = Math.max(1, Math.ceil(totalCount / itemsPerPage))
        setTotalPages(total)
        setTotalItems(totalCount)
        setCurrentMovies(movies)
        setItemsOnPage(movies.length)

        console.log(
          `Page ${currentPage}: showing ${movies.length} of ${totalCount} items, total pages: ${total}`
        )
      } catch (error) {
        console.error("Error fetching movies:", error)
        setTotalPages(1)
        setCurrentMovies([])
        setItemsOnPage(0)
        setTotalItems(0)
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage])

  const handlePageChange = (newPage: number) => {
    console.log(`Changing to page: ${newPage}`)
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    console.log(`Changing items per page to: ${newItemsPerPage}`)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleApplyFilters = (filters: FilterFormData) => {
    console.log("Applying filters:", filters)
    // Implement your filter logic here
    // You might want to call an API with these filters
  }

  const handleSaveMovie = async (movieData: MovieFormData) => {
    try {
      console.log("Saving movie:", movieData)
      // Implement your save movie API call here
      // Example: await createMovie(movieData);

      // Refresh movie list after save
      const response = await getMoveis(currentPage, itemsPerPage)
      console.log("All movie:", movieData, response)
      if (response && response.movies && Array.isArray(response.movies)) {
        setCurrentMovies(response.movies)
        setTotalItems(response?.totalCount || response.movies.length)
      }
    } catch (error) {
      console.error("Error saving movie:", error)
      // Handle errors appropriately
    }
  }

  const tableData: TableDataItem[] = currentMovies
    .filter(project => project.id !== undefined) // garante que o id existe
    .map(project => ({
      title: project.name,
      image:
        "https://upload.wikimedia.org/wikipedia/pt/5/59/Captain_Marvel_%282018%29.jpg",
      rating: 67,
      year: 2025,
      name: project.name,
      id: project.id!,
      status: project.status,
      type: project.type,
      genres: ["Ação", "Ficção Científica"]
    }))

  useEffect(() => {
    setTitle("Filmes")
  }, [setTitle])

  const loading = false

  return (
    <>
      <S.Container>
        <S.Header>
          <S.SearchBar>
            <S.SearchInput type="text" placeholder="Pesquisar por filmes" />
            <S.SearchIcon />
          </S.SearchBar>
          <S.FiltersButton onClick={() => setIsFilterModalVisible(true)}>
            Filtros
          </S.FiltersButton>
          <S.FiltersButton onClick={() => setIsAddMovieModalVisible(true)}>
            Adicionar Filme
          </S.FiltersButton>
        </S.Header>

        {loading ? (
          <S.LoadingContainer>Carregando filmes...</S.LoadingContainer>
        ) : (
          <MoviesGrid movies={tableData} />
        )}

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          itemsOnPage={itemsOnPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </S.Container>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />

      <AddMovieModal
        isVisible={isAddMovieModalVisible}
        onClose={() => setIsAddMovieModalVisible(false)}
        onSaveMovie={handleSaveMovie}
      />
    </>
  )
}

export default Movies
