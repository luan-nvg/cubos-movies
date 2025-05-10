import styled from "styled-components"
import { InputProps } from "./types"

export const InputContainer = styled.span<InputProps>`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    min-height: 50px;
    font-size: 1.2rem;
  }

  svg {
    position: absolute;
    left: 0.76rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`

export const InputStyled = styled.input<InputProps>`
  background-color: ${props => props.backgroundcolor || "#E8F0FE"};
  color: ${props => props.color || "#000"};
  border-radius: ${props => props.borderradius || "0.5rem"};
  padding: ${props => props.padding || "0.5rem 1.2rem"};
  border: ${props => props.border || "none"};
  width: ${props => props.width || "13rem"};
  outline: ${props => props.outlineinput || "none"};
  height: ${props => props.height || "35px"};
  font-weight: ${props => props.fontweight || "regular"};
  font-family: Poppins, Helvetica, "sans-serif";
  font-size: 1.2rem;
  &::placeholder {
    color: ${props => props.placeholdercolor || "#000"};
    
    margin-left: 0.5rem;
  }
  &:focus {
    outline: ${props => props.outlinefocus || "2px solid #2774b3"};
  }
  &:disabled {
    background-color: ${props => props.disabledbgcolor || "#555"};
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.605rem;
  }
`
