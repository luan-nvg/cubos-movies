import styled from "styled-components"
import Typography from "../Typography"
import Button from "../Button"
import {
  DropdownMenuStyleProps,
  DropdownItemStyleProps,
  DropdownTitleStyleProps
} from "./types"

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

export const DropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.boxshadowbutton || "none"};
  border: ${props => props.borderbutton || "1px solid #e4e6ef"};
  background-color: ${props => props.bgcolor || "#fff"};
  color: ${props => props.textcolor || "#000"};
  padding: ${props => props.paddingbutton || ".95rem"};
  font-weight: ${props => props.fontweightbutton};
  font-size: 14px;
  width: ${props => props.widthbutton || "100%"};
  height: ${props => props.heightbutton || "35px"};

  &:hover {
    background-color: ${props => props.hoverbgcolor || "secondary"};
    color: ${props => props.textcolor || "secondary"};
    font-weight: bold;
  }

  svg {
    flex-shrink: 0;
  }
`

export const DropdownMenu = styled.ul<DropdownMenuStyleProps>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: ${props => props.bgcolormenu || "#fff"};
  border: ${props => props.bordermenu || "1px solid black"};
  list-style: none;
  padding: ${props => props.paddingmenu || "0"};
  margin: ${props => props.marginmenu || "0"};
  width: ${props => props.widthmenu || "31rem"};
  border-radius: ${props => props.borderradiusmenu || ".5rem"};
  font-family: ${props =>
    props.fontfamily || 'Roboto, Helvetica, "sans-serif"'};
  font-size: 14px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const DropdownItem = styled.li<DropdownItemStyleProps>`
  padding: ${props => props.paddingitem || ".95rem"};
  cursor: pointer;
  border-radius: ${props => props.borderradiusitem || ".5rem"};
  font-size: 14px;
  margin: 0;

  &:hover {
    background-color: ${props => props.hoverbgcoloritem || "#f0f0f0"};
    color: #2774b3;
    font-weight: bold;
  }
`

export const DropdownSectionTitle = styled(Typography)<DropdownTitleStyleProps>`
  font-weight: ${props => props.fontweightsection || "bold"};
  padding: 0.75rem 0.95rem;
  margin: 0;
`
