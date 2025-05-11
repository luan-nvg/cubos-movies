import styled from "styled-components"
import { Button } from "@/components/Button"
export const ThemeButtonContainer = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  width: 48px;
  height: 42px;

  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  font-size: 24px;
  color: var(--black);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }

  &:hover {
    background-color: var(--bg-light);
  }
`
