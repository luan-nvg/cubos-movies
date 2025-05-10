import { Button } from "@/components/Shared"
import styled from "styled-components"

export const ButtonComponent = styled(Button)`
  background-color: var(--light-primary);
  color: var(--white);
  font-size: var(--sm);
  font-weight: var(--semibold);
  font-family: Poppins, Helvetica, "sans-serif";
  gap: 1.6rem;
  border-radius: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 2.5rem;

  &:hover {
    background-color: var(--primary-hover);
  }
`
