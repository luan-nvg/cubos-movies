import { Separator, Typography } from "@/components/Shared"
import styled from "styled-components"

interface PageTitleProps {
  fontSize?: string
  color?: string
}

export const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: left;
`

export const PageTitle = styled(Typography)<PageTitleProps>`
  font-size: ${({ fontSize }) => fontSize || "var(--md)"};
  font-weight: 500;
  color: ${({ color, theme }) =>
    color || (theme === "light" ? "var(--primary)" : "var(--white)")};
`

export const Divider = styled(Separator)`
  color: var(--black);
  opacity: 0.7;
  width: 100%;
`
