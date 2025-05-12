interface IBoard {
  id?: string // Adicionando o ID da linha
  name: string
  status: string
  type: string
}

interface IBoard_Data {
  data: IBoard[]
}

export type { IBoard, IBoard_Data }
