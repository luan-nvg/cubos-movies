import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import { DateTimePickerComponent } from "@/components/DateTimePicker" // Assuming you have a

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  padding: 2rem;
`

export const Header = styled.header`
  display: flex;
  justify-content: flex-end; /* alinhado à direita */
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch; /* para ocupar a largura inteira no mobile */
  }
`

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: auto; /* permite encolher conforme o conteúdo */
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SearchInput = styled.input`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #2e2e2e;
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #999999;
  }
`

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.75rem;
  color: #999999;
  font-size: 1rem;
  align-items: flex-end;
`

export const FiltersButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
`

export const Ellipsis = styled.span`
  padding: 0 0.5rem;
  color: #ffffff;
`

export const SectionSubtitle = styled.div`
  margin-bottom: 1.5rem;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const DateTimePicker = styled(DateTimePickerComponent)`
  width: 100%;
`
