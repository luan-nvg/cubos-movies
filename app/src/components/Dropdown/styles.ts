import styled from "styled-components"
import { DropdownToggleProps } from "./interface"

export const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: left;
`

export const DropdownToggle = styled.button<DropdownToggleProps>`
  /* background-color: ${({ hovered }) => (hovered ? "#0564B1" : "#E2E8F0")}; */
  /*  color: ${({ hovered }) => (hovered ? "#F1F5F9" : "#020617")}; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  padding: 0.4rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 10;
  background-color: #ffffff; // cor escura parecida com o dropdown da imagem
  border-radius: 0.5rem;
  min-width: 180px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.4rem 0;
`

export const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-family: Poppins, Helvetica, "sans-serif";
  font-weight: 400;
  color: black;

  &:hover {
    background-color: #2563eb;
    color: white;
    border-radius: 0.375rem;
  }

  span {
    font-size: 14px;
  }
`
