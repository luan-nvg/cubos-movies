import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"
import onAllProjects from "@/services/Boards/AllBoardsControl"
import { useIntl } from "react-intl"
import MoviesGrid from "@/components/MoviesGrid"
import TablePagination from "@/components/TablePagination" // Import the new component
import { useTitle } from "@/contexts/TitleContext"
import { TableDataItem, IBoard } from "./interface" // Adicione o import do tipo TableColumn
import Modal from "@/components/Modal"
import moment from "moment"
import { Input } from "@/components/Shared"
// Get Current Date - 7
function generateInitialDate() {
  const today = new Date()
  const initialDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return initialDate.toISOString().slice(0, 16)
}
// Get Current Date
function currentISODateFormatted() {
  return new Date().toISOString().slice(0, 16)
}

// Format date for API calls
function formatDate(date: moment.MomentInput) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

const Movies = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentBoards, setCurrentBoards] = useState<IBoard[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsOnPage, setItemsOnPage] = useState(0)
  const { setTitle } = useTitle()
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const intl = useIntl()
  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const [formData, setFormData] = useState({
    initialDate: generateInitialDate(),
    finalDate: currentISODateFormatted(),
    title: ""
  })

  const handleSubmitReport = () => {
    const { title, initialDate, finalDate } = formData
    console.log(title, initialDate, finalDate)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pass current page to API call
        const response = await onAllProjects(currentPage, itemsPerPage)

        // Get projects array and totalCount from response
        let boards = []
        let totalCount = 0

        if (response && response.entities && Array.isArray(response.entities)) {
          boards = response.entities
          totalCount = response?.totalCount || boards.length
        } else if (Array.isArray(response)) {
          boards = response
          totalCount = response.length
        }

        // Calculate total pages based on totalCount from API
        const total = Math.max(1, Math.ceil(totalCount / itemsPerPage))
        setTotalPages(total)
        setTotalItems(totalCount)
        setCurrentBoards(boards)
        setItemsOnPage(boards.length)

        console.log(
          `Page ${currentPage}: showing ${boards.length} of ${totalCount} items, total pages: ${total}`
        )
      } catch (error) {
        console.error("Error fetching boards:", error)
        setTotalPages(1)
        setCurrentBoards([])
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

  const tableData: TableDataItem[] = currentBoards
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
    setTitle("Placas")
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
          <S.FiltersButton
            onClick={() => {
              setIsModalVisible(true)
            }}
          >
            Filtros
          </S.FiltersButton>
          <S.FiltersButton>Adicionar Filme</S.FiltersButton>
        </S.Header>

        {/* <S.SectionSubtitle>
          <SectionTitle fontSize="var(--md)" title="Listar Placas" />
        </S.SectionSubtitle> */}

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

      {isModalVisible && (
        <>
          <Modal
            textbuttonSave="Aplicar Filtros"
            title={intl.formatMessage({ id: "general.report" })}
            onClose={() => setIsModalVisible(false)}
            onSave={async () => {
              const { initialDate, finalDate } = formData

              try {
                const res = await api.post("/drives/valid-rule-date", {
                  queryParams: {
                    start_date: formatDate(initialDate),
                    end_date: formatDate(finalDate)
                  }
                })

                if (res.data.success) {
                  handleSubmitReport()
                } else {
                  setAlert({
                    message: "Erro inesperado. Tente novamente mais tarde.",
                    type: "error"
                  })
                }
              } catch (err) {
                const error = err as AxiosError<{ message: string }>

                const serverMessage = error.response?.data?.message

                setAlert({
                  message:
                    serverMessage ||
                    "Erro inesperado. Tente novamente mais tarde.",
                  type: "error"
                })
              }
            }}
          >
            {alert && (
              <S.FormGroup>
                <AnimatedAlert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(null)}
                />
              </S.FormGroup>
            )}

            <S.FormGroup>
              <Input
                id="title"
                placeholder="nome do filme"
                onChange={date => {
                  setFormData({ ...formData, title: date.target.value })
                }}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.DateTimePicker
                value={formData.initialDate}
                onChange={date => {
                  setFormData({ ...formData, initialDate: date.target.value })
                }}
                label={intl.formatMessage({
                  id: "report.startDate.placeholder"
                })}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.DateTimePicker
                value={formData.finalDate}
                onChange={date => {
                  setFormData({ ...formData, finalDate: date.target.value })
                }}
                label={intl.formatMessage({
                  id: "report.endDate.placeholder"
                })}
              />
            </S.FormGroup>
          </Modal>
        </>
      )}
    </>
  )
}

export default Movies
