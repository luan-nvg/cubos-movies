import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import { PaginationProps } from "./types"
import * as S from "./styles"
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
      <S.PaginationContainer>
        <S.PageButton
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
        </S.PageButton>
        <S.PageButton
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
        </S.PageButton>

        {/* Botões de números de página */}
        {[...Array(totalpages)].map((_, index) => {
          const isActive = activePage === index + 1
          return (
            <S.PageButton
              key={index}
              onClick={() => handleClick(index + 1)}
              active={isActive}
              // disabled={isActive} // Desabilita o botão da página ativa
              borderradius={borderradius}
              bgcolor={bgcolor}
              activecolor={activecolor}
              hoverbgcolor={hoverbgcolor}
              disablecolor={disablecolor}
              disablebgcolor={disablebgcolor}
              disablehovercolor={disablehovercolor}
              {...props}
            >
              {index + 1}
            </S.PageButton>
          )
        })}

        <S.PageButton
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
        </S.PageButton>
        <S.PageButton
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
        </S.PageButton>
      </S.PaginationContainer>
    </StyleSheetManager>
  )
}

export default Pagination
