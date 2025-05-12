interface IBoard {
  id?: string // Adicionando o ID da linha
  name: string
  status: string
  type: string
}

interface IBoard_Data {
  data: IBoard[]
  totalCount: number
}

interface TableConfig {
  title?: string
  key?: string
  colWidth?: string
}

interface TableColumn {
  key?: string
  title?: string
  alignrow?: string
  aligncolumn?: string
  widthpercentage?: string
  colWidth?: string
}

interface TableDataItem {
  name: string
  id: string | number // dependendo de como o `id` vem do `project`
  status: string
  type: string
}

interface ColData {
  key?: string
  title?: string
  alignrow: string
  aligncolumn: string
  widthpercentage?: string
  colWidth?: string
}

export type {
  IBoard,
  IBoard_Data,
  TableColumn,
  TableDataItem,
  ColData,
  TableConfig
}
