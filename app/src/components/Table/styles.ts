import { AlertDialog, CheckBox, Table } from "@/components/Shared"
import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

export const ContainerTable = styled.div`
  width: 100%;
  height: fit-content;

  background-color: ${props =>
    props.theme === "light" ? "var(--white)" : "var(--black)"};

  border-radius: 8px;
  overflow-x: auto; // Habilita scroll horizontal no mobile
  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;
  scrollbar-color: var(--light-gray) transparent;
`

export const StyledCheckBox = styled(CheckBox)`
  accent-color: var(--light-primary);
  cursor: pointer;
`

export const Tables = styled(Table)`
  min-width: 600px; // Garante que o conteúdo force o scroll se necessário
  width: 100%;
  table-layout: fixed;

  th,
  td {
    text-align: left;
    padding: 0.8rem;
  }

  th {
    text-transform: uppercase;
    background-color: ${props =>
      props.theme === "light" ? "var(--white)" : "var(--black)"};

    letter-spacing: 1px;

    color: ${props =>
      props.theme === "light" ? "var(--light-gray)" : "var(--white)"};

    font-size: var(--md);

    span {
      font-weight: var(--semibold);
    }
  }

  td {
    span {
      font-size: var(--sm);

      color: ${props =>
        props.theme === "light" ? "var(--black)" : "var(--white)"};
    }
    background: ${props =>
      props.theme === "light" ? "var(--white)" : "var(--black)"};
  }

  tr {
    background-color: ${props =>
      props.theme === "light" ? "var(--white)" : "var(--dark)"};
  }

  tr:hover {
    background-color: var(--bg-default);
  }
`

export const TableCell = styled.td<{ width: string }>`
  width: ${props => props.width || "auto"};
  text-align: center;
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid var(--black);
  height: 3rem;
  width: 3rem;
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover);
  }
`

export const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: #94a3b890;

  &.is-visible {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
`

export const Modal = styled(AlertDialog)`
  h1 {
    font-size: var(--lg);
    font-weight: var(--semibold);
    margin-bottom: 0.8rem;
  }

  p {
    font-size: var(--md);
    margin-top: 0.8rem;
  }

  button:last-of-type {
    border-bottom: 1px solid var(--black);
    border-radius: 0;
    width: fit-content;
    justify-content: center;
    align-self: center;

    &:hover {
      color: var(--primary-hover);
      border-bottom-color: var(--primary-hover);
    }
  }
`
