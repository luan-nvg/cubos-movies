import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import * as S from "./styles"
import AllDrivers from "@/services/Boards/AllDrivers"

import Table from "@/components/Table"
import { SectionTitle } from "@/components/SectionTitle"
import { Pagination } from "@/components/Shared"

import { useProjectContext } from "@/contexts/ProjectContext"
import { useTitle } from "@/contexts/TitleContext"
import { Divider } from "@/components/Divider"

import { useIntl } from "react-intl"

import AnimatedAlert from "@/components/Alert/AnimatedAlert" // Importe o AnimatedAlert

import type { AxiosError } from "axios"

// Utility function to parse URL query parameters
const useQueryParams = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  return {
    id_board: searchParams.get("id_board"),
    start_date: searchParams.get("start_date"),
    end_date: searchParams.get("end_date"),
    type: searchParams.get("type"),
    module_value: searchParams.get("module_value"),
    type_report: searchParams.get("type_report")
  }
}

const Boards = () => {
  const { setProjectId } = useProjectContext()
  const projectsPerPage = 30
  const [currentPage, setCurrentPage] = useState(1)
  const [currentProjects, setCurrentProjects] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsOnPage, setItemsOnPage] = useState(0)
  const [formatName, setFormatName] = useState("")
  const intl = useIntl() // Hook para usar as funções de tradução
  const { setTitle } = useTitle()
  const params = useQueryParams()
  console.log(itemsOnPage)

  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const columnConfig = [
    { title: "Nome", key: "name", colWidth: "10%" },
    { title: "Descrição", key: "description", colWidth: "10%" },
    { title: "Criado em", key: "created_in", colWidth: "10%" }
  ]

  useEffect(() => {
    if (params?.type_report) {
      const typeReport = params.type_report.toLowerCase()

      const res = intl.formatMessage({ id: `general.dropdown.${typeReport}` })

      setFormatName(`Relatório de ${res}`)

      // Update global page title
      setTitle("Relatório")
    }
  }, [params])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pass current page to API call
        const response = await AllDrivers(currentPage, projectsPerPage, params)

        // Get projects array and totalCount from response
        let projects = []
        let totalCount = 0
        if (response && response?.success === false) {
          setAlert({
            message: response?.message,
            type: "error"
          })
        }
        if (response && response.entities && Array.isArray(response.entities)) {
          projects = response.entities
          totalCount = response.totalCount || projects.length
        } else if (Array.isArray(response)) {
          projects = response
          totalCount = response.length
        }

        // Calculate total pages based on totalCount from API
        const total = Math.max(1, Math.ceil(totalCount / projectsPerPage))
        setTotalPages(total)
        setTotalItems(totalCount)
        setCurrentProjects(projects)
        setItemsOnPage(projects.length)

        console.log(
          `Page ${currentPage}: showing ${projects.length} of ${totalCount} items, total pages: ${total}`
        )
      } catch (err) {
        console.error("Error fetching projects:", err)
        setTotalPages(1)
        setCurrentProjects([])
        setItemsOnPage(0)
        setTotalItems(0)
        const error = err as AxiosError<{ message: string }>

        const serverMessage = error.response?.data?.message

        setAlert({
          message:
            serverMessage || "Erro inesperado. Tente novamente mais tarde.",
          type: "error"
        })
      }
    }

    fetchData()
  }, [currentPage, projectsPerPage])

  const handlePageChange = (newPage: number) => {
    console.log(`Changing to page: ${newPage}`)
    setCurrentPage(newPage)
  }

  const tableData: any = currentProjects.map(project => ({
    name: project.name_board,
    // id: project.id,
    description: project.description,
    created_in: project.created_in
  }))

  useEffect(() => {
    setTitle("Placas")
  }, [setTitle])

  return (
    <>
      {alert && (
        <AnimatedAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <S.Container>
        <S.SectionSubtitle>
          <SectionTitle fontSize="var(--md)" title={formatName} />
        </S.SectionSubtitle>
        <Divider width="calc(100% + 8.8rem)" margin="0 0 0 -4.4rem" />
        {/* <TemperatureChart params={params} /> */}
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
          tableColumns={columnConfig.map(col => {
            return {
              ...col,
              alignrow: "left",
              aligncolumn: "left",
              widthpercentage: col.colWidth
            }
          })}
        />
        <S.PaginationWrapper>
          <Pagination
            active={true}
            currentpage={currentPage}
            onpagechange={handlePageChange}
            totalpages={totalPages}
            updatecurrentpage={currentPage}
          />
          <S.InfoText>
            Mostrando {Math.min(currentPage * projectsPerPage, totalItems)} de{" "}
            {totalItems} itens
          </S.InfoText>
        </S.PaginationWrapper>
      </S.Container>
    </>
  )
}

export default Boards
