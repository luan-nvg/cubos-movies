// Divider/styles.ts
import styled from "styled-components"

interface StyledDividerProps {
  width: string
  margin: string
}

export const StyledDivider = styled.div<StyledDividerProps>`
  width: ${props => props.width || "100%"};
  margin: ${props => props.margin || "0"};
  height: 1px;
  background-color: #3d393f; /* Linha cinza clara */
  text-align: center;
`
