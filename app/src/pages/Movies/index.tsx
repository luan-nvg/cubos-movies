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
  const [loading, setLoading] = useState(false)
  const { setTitle } = useTitle()
  const navigate = useNavigate()
  const intl = useIntl()

  // Filter modal state
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  // Add movie modal state
  const [isAddMovieModalVisible, setIsAddMovieModalVisible] = useState(false)

  // Função para buscar os filmes da API
  const fetchMovies = async (page, limit) => {
    setLoading(true)
    try {
      console.log(
        `Fetching movies for page ${page} with ${limit} items per page`
      )
      const response = await getMoveis(page, limit)

      // Verificar a estrutura da resposta
      let movies = []
      let totalCount = 0
      let totalPagesCount = 1

      if (response && response.movies && Array.isArray(response.movies)) {
        movies = response.movies
        totalCount = response.pagination?.total || movies.length
        totalPagesCount =
          response.pagination?.totalPages || Math.ceil(totalCount / limit)
      } else if (Array.isArray(response)) {
        movies = response
        totalCount = response.length
        totalPagesCount = Math.ceil(totalCount / limit)
      }

      setCurrentMovies(movies)
      setTotalItems(totalCount)
      setTotalPages(totalPagesCount)
      setItemsOnPage(movies.length)

      console.log(
        `Page ${page}: showing ${movies.length} of ${totalCount} items, total pages: ${totalPagesCount}`
      )
    } catch (error) {
      console.error("Error fetching movies:", error)
      setCurrentMovies([])
      setTotalItems(0)
      setTotalPages(1)
      setItemsOnPage(0)
    } finally {
      setLoading(false)
    }
  }

  // Efeito para carregar os filmes quando a página ou itens por página mudarem
  useEffect(() => {
    fetchMovies(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  // Handler para mudança de página
  const handlePageChange = newPage => {
    if (newPage === currentPage) return // Evitar recarregar a mesma página

    console.log(`Changing to page: ${newPage}`)
    setCurrentPage(newPage)
  }

  // Handler para mudança de itens por página
  const handleItemsPerPageChange = newItemsPerPage => {
    if (newItemsPerPage === itemsPerPage) return

    console.log(`Changing items per page to: ${newItemsPerPage}`)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleApplyFilters = filters => {
    console.log("Applying filters:", filters)
    // Implement your filter logic here
    // Você pode querer reiniciar a paginação aqui também
    setCurrentPage(1)
    // Adicionar lógica de filtro e chamar fetchMovies com os filtros
  }

  const handleSaveMovie = async movieData => {
    try {
      console.log("Saving movie:", movieData)
      // Implement your save movie API call here
      // Example: await createMovie(movieData);

      // Refresh movie list after save
      await fetchMovies(currentPage, itemsPerPage)
    } catch (error) {
      console.error("Error saving movie:", error)
      // Handle errors appropriately
    }
  }

  const tableData = currentMovies
    .filter(movie => movie.id !== undefined)
    .map(movie => ({
      title: movie.title || movie.name, // Compatibilidade com diferentes formatos
      image:
        movie.posterUrl ||
        "https://upload.wikimedia.org/wikipedia/pt/5/59/Captain_Marvel_%282018%29.jpg",
      rating: movie.rating || 0,
      year: movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : 2025,
      name: movie.title || movie.name,
      id: movie.id,
      status: movie.status,
      type: movie.type,
      genres: movie.genres || []
    }))

  useEffect(() => {
    setTitle("Filmes")
  }, [setTitle])

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
