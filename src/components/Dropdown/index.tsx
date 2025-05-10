import React, { useState, useRef, useEffect } from "react"
import * as S from "./styles"
import { MoreOptionProps } from "./interface"

const MoreOptions: React.FC<MoreOptionProps> = ({ options, children }) => {
  const [hovered, setHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <S.StyledDropdown ref={dropdownRef}>
      <S.DropdownToggle
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        hovered={hovered}
        onClick={toggleDropdown}
      >
        {children}
      </S.DropdownToggle>
      {isOpen && (
        <S.DropdownMenu isOpen={isOpen}>
          {options.map((option, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => {
                option.action()
                setIsOpen(false)
              }}
            >
              <span>{option.label}</span>
            </S.DropdownItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.StyledDropdown>
  )
}

export default MoreOptions
