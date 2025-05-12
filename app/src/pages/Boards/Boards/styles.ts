import styled from "styled-components"
import { Typography } from "@/components/Shared"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

export const Subtitle = styled.div`
  display: flex;
  justify-content: right;
`

export const NewProjectButton = styled(Button)`
  width: fit-content;
  padding: 1.2rem 2.4rem;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  z-index: 10;
  min-height: fit-content;
`

export const SectionSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 20rem;
  margin-left: auto;
`

export const SearchInput = styled(Input)`
  label {
    display: none;
  }

  input {
    background-color: var(--white);
    border: 1px solid var(--bg-disabled);

    &::placeholder {
      color: var(--disabled);
    }
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;
  width: 100%;
`

export const OptionsButton = styled(Button)`
  padding: 0.8rem 1.6rem;
  height: 32px;
  width: 32px;
  color: var(--light-primary);
`

export const InfoText = styled(Typography)`
  font-size: var(--sm);
  margin-top: 2rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`

export const OptionButton = styled.button`
  background-color: "#E2E8F0";
  color: "#020617";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0564b1;
    color: #f1f5f9;
  }
`
