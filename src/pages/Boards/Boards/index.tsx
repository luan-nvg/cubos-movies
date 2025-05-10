import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"
import onAllProjects from "@/services/Boards/AllBoardsControl"
import { IBoard } from "./interface"
import Table from "@/components/Table"
import { SectionTitle } from "@/components/SectionTitle"
import { Divider } from "@/components/Divider"
import TablePagination from "@/components/TablePagination" // Import the new component
import { useProjectContext } from "@/contexts/ProjectContext"
import { useTitle } from "@/contexts/TitleContext"
import { TableColumn, TableDataItem, TableConfig } from "./interface" // Adicione o import do tipo TableColumn

import { TbReport } from "react-icons/tb"

const Boards = () => {
  const { setProjectId } = useProjectContext()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentBoards, setCurrentBoards] = useState<IBoard[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsOnPage, setItemsOnPage] = useState(0)
  const { setTitle } = useTitle()
  const navigate = useNavigate()

  const columnConfig: TableConfig[] = [
    { title: "Nome", key: "name", colWidth: "50%" },
    { title: "Ações", key: "action", colWidth: "10%" }
  ]

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
      name: project.name,
      id: project.id!,
      status: project.status,
      type: project.type,
      action: (
        <S.ButtonsWrapper>
          <S.OptionButton
            onClick={() => navigate(`/boards/detail/${project.id}`)}
          >
            <TbReport size={20} />
          </S.OptionButton>
        </S.ButtonsWrapper>
      )
    }))

  useEffect(() => {
    setTitle("Placas")
  }, [setTitle])

  const tableColumns: TableColumn[] = columnConfig.map((col: TableConfig) => ({
    key: col.key ?? col.title ?? "default-key",
    title: col.title,
    alignrow: "left", // valor padrão
    aligncolumn: "left", // valor padrão
    widthpercentage: col.colWidth
  }))

  return (
    <>
      <S.Container>
        <S.SectionSubtitle>
          <SectionTitle fontSize="var(--md)" title="Listar Placas" />
        </S.SectionSubtitle>
        <Divider width="calc(100% + 8.8rem)" margin="0 0 0 -4.4rem" />

        <Table
          checkbox={false}
          data={tableData}
          onView={data => {
            if (data.id) {
              setProjectId(data.id)
              console.log("Projeto selecionado com ID:", data.id)
            } else {
              console.error("ID do projeto está indefinido")
            }
          }}
          tableColumns={tableColumns}
        />

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
    </>
  )
}

export default Boards
