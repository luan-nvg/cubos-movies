import { LabelInput } from "@/components/Shared"
import styled from "styled-components"

export const InputComponent = styled(LabelInput)`
  justify-content: left;
  align-items: left;
  gap: 1.6rem;
  color: var(--black);
  width: 100%;

  label {
    font-size: var(--md);
    font-weight: var(--semibold);
  }

  input {
    font-size: var(--sm);
    padding: 0.8rem 1.2rem;
    background-color: var(--bg-light);
    width: 100%;
    padding-left: 3.2rem;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

    &:disabled {
      background-color: var(--bg-disabled);
      color: var(--disabled);
    }

    &::placeholder {
      color: var(--black);
    }

    &:focus {
      border: 1px solid var(--light-primary);
    }
  }
`
