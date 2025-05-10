import { ReactNode } from "react"

// Interfaces
export interface TableProps {
  data: any
  tableColumns: any[]
  onEdit?: (item: RowData) => void
  onView?: (item: RowData) => void
  onDelete?: (item: RowData) => void
  checkbox?: boolean
}

export interface RowData {
  id?: string // Adicionando o ID da linha
  name: string
  status: string
  type: string
  action?: boolean
  selected?: boolean
}

export interface Column {
  key: string
  header: ReactNode
  bgcolumncolor?: string
  textcolumncolor?: string
  widthpercentage?: string
  aligncolumn?: string
  alignrow?: string
  columnwidth?: string[] // Existing property
  render?: (rowData: RowData) => ReactNode // Add this line for rendering row data
}
