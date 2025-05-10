import React, { useState, useEffect, useRef } from "react"
import * as S from "./styles"
import { DropdownProps, Option } from "./types"
import { FaChevronDown, FaChevronUp } from "react-icons/fa" // Using react-icons

const DropDown: React.FC<DropdownProps> = ({
  sections,
  onSelect,
  titledropdown,
  icon,
  bgcolor,
  hoverbgcolor,
  fontfamily,
  textcolor,
  widthbutton,
  borderbutton,
  paddingbutton,
  fontweightbutton,
  bgcolormenu,
  bordermenu,
  borderradiusmenu,
  borderradiusitem,
  fontweightsection,
  hoverbgcoloritem,
  widthmenu,
  paddingitem,
  paddingmenu,
  marginmenu,
  boxshadowbutton,
  selectedValue,
  heightbutton,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option) => {
    setSelectedOption(option.label)
    onSelect(option.value)
    toggleDropdown()
  }

  // Handle click outside
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

  // Set selected option based on selectedValue prop
  useEffect(() => {
    if (selectedValue && sections) {
      const foundOption = sections
        .flatMap(section => section.options)
        .find(option => option.value === selectedValue)

      if (foundOption) {
        setSelectedOption(foundOption.label)
      }
    }
  }, [selectedValue, sections])

  return (
    <S.DropdownContainer {...rest} ref={dropdownRef}>
      <S.DropdownButton
        widthbutton={widthbutton}
        boxshadowbutton={boxshadowbutton}
        fontweightbutton={fontweightbutton}
        paddingbutton={paddingbutton}
        borderbutton={borderbutton}
        bgcolor={bgcolor}
        hoverbgcolor={hoverbgcolor}
        textcolor={textcolor}
        heightbutton={heightbutton}
        onClick={toggleDropdown}
        textbutton={selectedOption || titledropdown}
        icon={
          icon || (
            <>
              {isOpen ? (
                <FaChevronUp style={{ marginLeft: "auto" }} size={14} />
              ) : (
                <FaChevronDown style={{ marginLeft: "auto" }} size={14} />
              )}
            </>
          )
        }
        iconRight
      />

      {isOpen && (
        <S.DropdownMenu
          bgcolormenu={bgcolormenu}
          borderradiusmenu={borderradiusmenu}
          bordermenu={bordermenu}
          widthmenu={widthmenu}
          paddingmenu={paddingmenu}
          marginmenu={marginmenu}
          fontfamily={fontfamily}
        >
          {sections?.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.titlelabel && (
                <S.DropdownSectionTitle fontweightsection={fontweightsection}>
                  {section.titlelabel}
                </S.DropdownSectionTitle>
              )}
              {section.options.map((option, optionIndex) => (
                <S.DropdownItem
                  borderradiusitem={borderradiusitem}
                  hoverbgcoloritem={hoverbgcoloritem}
                  paddingitem={paddingitem}
                  key={optionIndex}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </S.DropdownItem>
              ))}
            </React.Fragment>
          ))}
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  )
}

export default DropDown
