import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import { PaginationProps } from "./types"
import { PaginationContainer, PageButton } from "./styles"
import { StyleSheetManager } from "styled-components"
import LeftArrow from "@/assets/left-arrow.svg"
import RightArrow from "@/assets/right-arrow.svg"
import LeftDoubleArrow from "@/assets/left-double-arrow.svg"
import RightDoubleArrow from "@/assets/right-double-arrow.svg"

const Pagination: React.FC<
  PaginationProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  currentpage,
  totalpages,
  onpagechange,
  active,
  borderradius = "",
  bgcolor = "",
  activecolor = "",
  hoverbgcolor = "",
  disablebgcolor = "",
  disablecolor = "",
  disablehovercolor = "",
  ...props
}) => {
  const [activePage, setActivePage] = useState(currentpage)

  useEffect(() => {
    setActivePage(currentpage)
  }, [currentpage])

  const handleClick = (newPage: number) => {
    setActivePage(newPage)
    onpagechange(newPage)
  }

  const handlePrevPage = () => {
    if (activePage > 1) {
      const newPage = activePage - 1
      setActivePage(newPage)
      onpagechange(newPage)
    }
  }

  const handleNextPage = () => {
    if (activePage < totalpages) {
      const newPage = activePage + 1
      setActivePage(newPage)
      onpagechange(newPage)
    }
  }

  const handleFirstPage = () => {
    setActivePage(1)
    onpagechange(1)
  }

  const handleLastPage = () => {
    setActivePage(totalpages)
    onpagechange(totalpages)
  }

  // Função original para mostrar 5 páginas consecutivas
  const getVisiblePages = () => {
    const totalPages = Math.max(1, totalpages)
    const current = Math.min(Math.max(1, activePage), totalPages)
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()

  return (
    <StyleSheetManager
      shouldForwardProp={prop =>
        ![
          "active",
          "borderradius",
          "bgcolor",
          "activecolor",
          "hoverbgcolor",
          "disablecolor",
          "disablebgcolor",
          "disablehovercolor"
        ].includes(prop)
      }
    >
      <PaginationContainer>
        <PageButton
          className="arrow-button"
          onClick={handleFirstPage}
          disabled={activePage === 1}
          active={false}
          borderradius={borderradius}
          bgcolor={bgcolor}
          activecolor={activecolor}
          hoverbgcolor={hoverbgcolor}
          disablecolor={disablecolor}
          disablebgcolor={disablebgcolor}
          disablehovercolor={disablehovercolor}
          {...props}
        >
          <img src={LeftDoubleArrow} alt="Primeira página" />
        </PageButton>
        <PageButton
          className="arrow-button"
          onClick={handlePrevPage}
          disabled={activePage === 1}
          active={false}
          borderradius={borderradius}
          bgcolor={bgcolor}
          activecolor={activecolor}
          hoverbgcolor={hoverbgcolor}
          disablecolor={disablecolor}
          disablebgcolor={disablebgcolor}
          disablehovercolor={disablehovercolor}
          {...props}
        >
          <img src={LeftArrow} alt="Página anterior" />
        </PageButton>

        {visiblePages.map(pageNum => (
          <PageButton
            key={pageNum}
            onClick={() => handleClick(pageNum)}
            active={activePage === pageNum}
            borderradius={borderradius}
            bgcolor={bgcolor}
            activecolor={activecolor}
            hoverbgcolor={hoverbgcolor}
            disablecolor={disablecolor}
            disablebgcolor={disablebgcolor}
            disablehovercolor={disablehovercolor}
            {...props}
          >
            {pageNum}
          </PageButton>
        ))}

        <PageButton
          className="arrow-button"
          onClick={handleNextPage}
          disabled={activePage === totalpages}
          active={false}
          borderradius={borderradius}
          bgcolor={bgcolor}
          activecolor={activecolor}
          hoverbgcolor={hoverbgcolor}
          disablecolor={disablecolor}
          disablebgcolor={disablebgcolor}
          disablehovercolor={disablehovercolor}
          {...props}
        >
          <img src={RightArrow} alt="Próxima página" />
        </PageButton>
        <PageButton
          className="arrow-button"
          onClick={handleLastPage}
          disabled={activePage === totalpages}
          active={false}
          borderradius={borderradius}
          bgcolor={bgcolor}
          activecolor={activecolor}
          hoverbgcolor={hoverbgcolor}
          disablecolor={disablecolor}
          disablebgcolor={disablebgcolor}
          disablehovercolor={disablehovercolor}
          {...props}
        >
          <img src={RightDoubleArrow} alt="Última página" />
        </PageButton>
      </PaginationContainer>
    </StyleSheetManager>
  )
}

export default Pagination
