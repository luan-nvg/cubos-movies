export type TablePaginationProps = {
  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
  totalItems?: number
  itemsOnPage?: number
  onPageChange?: (newPage: number) => void
  onItemsPerPageChange?: (localItemsPerPage: number) => void
}
