// styles.ts
import styled from "styled-components"
import { Input as MipInput } from "@/components/Input"
import { Button as MipButton } from "@/components/Button"

// Estilos básicos para o modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-weight: var(--semibold) !important;
`

export const ModalContent = styled.div`
  background: white;
  /* width: 500px; */
  padding: 20px;
  border-radius: 10px;
  position: relative;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`

export const ModalTitle = styled.h2`
  margin: 0;
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

export const ModalBody = styled.div`
  padding: 20px 0;
  font-weight: var(--semibold);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`

export const Input = styled(MipInput)`
  width: 100%; /* Certifique-se de que o Input ocupe a largura total */
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
`

export const SaveButton = styled(MipButton)`
  width: fit-content;
  padding: 1.2rem 2.4rem;
`

export const CancelButton = styled(MipButton)`
  width: fit-content;
  padding: 1.2rem 2.4rem;
  margin-right: 10px;
`
