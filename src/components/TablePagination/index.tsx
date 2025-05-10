import { useState, useEffect } from "react"
import { Pagination, DropDown } from "@/components/Shared"
import {
  PaginationWrapper,
  Cont,
  DropDownWrapper,
  InfoText,
  PaginationContainer
} from "./styles"
import { TablePaginationProps } from "./interfaces"
import { useTheme } from "../../hooks/useTheme"

const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  totalItems = 0,
  itemsOnPage = 0,
  onPageChange = () => {},
  onItemsPerPageChange = () => {}
}: TablePaginationProps) => {
  const { theme } = useTheme()

  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage)

  useEffect(() => {
    setLocalItemsPerPage(itemsPerPage)
  }, [itemsPerPage])

  useEffect(() => {
    onItemsPerPageChange(localItemsPerPage)
  }, [localItemsPerPage, onItemsPerPageChange])

  return (
    <PaginationWrapper>
      <Cont>
        <DropDownWrapper>
          <DropDown
            titledropdown={String(localItemsPerPage)}
            sections={[
              {
                options: [
                  { label: "10", value: "10" },
                  { label: "20", value: "20" },
                  { label: "30", value: "30" }
                ]
              }
            ]}
            onSelect={value => setLocalItemsPerPage(Number(value))}
            selectedValue={String(localItemsPerPage)}
          />
        </DropDownWrapper>
        <InfoText theme={theme}>
          Mostrando {itemsOnPage} de {totalItems} itens
        </InfoText>
      </Cont>

      <PaginationContainer>
        <Pagination
          active={true}
          currentpage={currentPage}
          onpagechange={onPageChange}
          totalpages={totalPages}
          updatecurrentpage={currentPage}
        />
      </PaginationContainer>
    </PaginationWrapper>
  )
}

export default TablePagination
