import { TypographyProps } from "./interfaces"
import styled from "styled-components"

export const Text = styled.p<TypographyProps>`
  ${({ size }) => size && `font-size: ${size};`}
  color: ${({ color }) => color || "black"};
  font-family: Poppins, Helvetica, sans-serif;
  ${({ fontweight }) => fontweight && `font-weight: ${fontweight};`}
  ${({ textdecoration }) =>
    textdecoration && `text-decoration: ${textdecoration};`}
`
