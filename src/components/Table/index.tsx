import { useEffect, useState } from "react"
import { Column, RowData, TableProps } from "./interfaces"
import * as S from "./styles"
import { useTheme } from "../../hooks/useTheme"

const Table = ({ data, tableColumns, checkbox = true }: TableProps) => {
  const [tableData, setTableData] = useState<RowData[]>([])
  const [allSelected, setAllSelected] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setTableData(data)
  }, [data])

  const handleCheckboxChange = (rowData: RowData) => {
    const updatedData = tableData.map(item => {
      if (item === rowData) {
        return { ...item, selected: !item.selected }
      }
      return item
    })
    setTableData(updatedData)
  }

  const handleSelectAll = () => {
    const newAllSelected = !allSelected
    setAllSelected(newAllSelected)
    const updatedData = tableData.map(item => ({
      ...item,
      selected: newAllSelected
    }))
    setTableData(updatedData)
  }

  const columns: Column[] = [
    {
      header: (
        <>
          {checkbox ? (
            <S.StyledCheckBox
              checked={allSelected}
              onChange={handleSelectAll}
            />
          ) : (
            <></>
          )}
        </>
      ),
      key: "selecionar",
      render: (rowData: RowData) => (
        <>
          {checkbox ? (
            <S.StyledCheckBox
              checked={rowData.selected}
              onChange={() => handleCheckboxChange(rowData)}
            />
          ) : (
            <></>
          )}
        </>
      ),
      widthpercentage: "1%",
      aligncolumn: "center",
      alignrow: "center"
    },
    ...tableColumns.map(col => ({
      header: col.headerRender ? col.headerRender() : col.title,
      key: col.key,
      widthpercentage: col.widthpercentage || "auto", // Valor padrão se widthpercentage não estiver definido
      aligncolumn: "center",
      alignrow: "center",
      render: (
        rowData: RowData // Altere o tipo para RowData
      ) => (
        <S.TableCell
          width={col.widthpercentage || "auto"} // Adicionando a propriedade width
          style={{
            width: col.widthpercentage || "auto"
          }} // Valor padrão aqui também
        >
          {rowData[col.key as keyof RowData]}
        </S.TableCell>
      )
    }))
  ]

  return (
    <S.Container theme={theme}>
      <S.ContainerTable theme={theme}>
        <S.Tables
          theme={theme}
          paddingrows="1.2rem .8rem"
          columns={columns}
          data={tableData.map(rowData => ({
            selecionar: (
              <>
                {checkbox ? (
                  <S.StyledCheckBox
                    checked={rowData.selected}
                    onChange={() => handleCheckboxChange(rowData)}
                  />
                ) : (
                  <></>
                )}
              </>
            ),
            ...rowData
          }))}
          style={{ width: "100%" }} // Garantindo que a tabela ocupe 100% da largura
        />
      </S.ContainerTable>
    </S.Container>
  )
}

export default Table
