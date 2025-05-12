import { DropDown, Label } from "@/components/Shared"
import styled from "styled-components"

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 1.6rem;
  color: var(--black);
  width: 100%;
`

export const LabelComponent = styled(Label)`
  font-size: var(--md);
  font-weight: var(--semibold);
`

export const DropdownComponent = styled(DropDown)`
  button {
    background-color: var(--bg-light);
    color: var(--black);
    font-size: var(--sm);
    border: 1px solid var(--black);
    padding: 0.8rem 1.2rem;
    width: 100%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 16px;

    &:hover {
      background-color: var(--white);
      color: var(--black);
      font-size: var(--sm);
      font-weight: var(--regular);
    }
  }

  ul {
    background-color: var(--bg-light);
    border: 1px solid var(--black);
    width: 100%;
  }

  li {
    font-size: var(--sm);
    color: var(--black);

    &:hover {
      background-color: var(--primary-hover);
      color: var(--white);
      font-weight: var(--regular);
      font-size: var(--sm);
    }
  }

  p {
    font-size: var(--sm);
    font-weight: var(--semibold);
    padding-left: 0.8rem;
    padding-top: 0.8rem;
  }
`
