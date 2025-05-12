import styled, { css } from "styled-components"
import { Input as MipInput } from "@/components/Input"
import { Button as MipButton } from "@/components/Button"

// Common styles with variant-specific modifications
const modalVariants = {
  central: css`
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  `,
  "slide-right": css`
    justify-content: flex-end;
    align-items: stretch;
    background: rgba(0, 0, 0, 0.5);
  `
}

const modalContentVariants = {
  central: css`
    /* width: 500px; */
    max-width: 90vw;
    border-radius: 10px;
  `,
  "slide-right": css`
    width: 100%;
    max-width: 600px;
    height: 100vh;
    border-radius: 10px 0 0 10px;
    position: absolute;
    right: 0;
    top: 0;
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `
}

const modalBodyVariants = {
  central: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  `,
  "slide-right": css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  `
}

const buttonVariants = {
  central: css`
    width: fit-content;
    padding: 1.2rem 2.4rem;
  `,
  "slide-right": css`
    width: 100%;
    margin-left: 3rem;
    padding: 1.2rem 2.4rem;
    margin-top: 20px;
  `
}

export const ModalOverlay = styled.div<{
  $variant?: "central" | "slide-right"
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  font-weight: var(--semibold) !important;

  ${props => modalVariants[props.$variant || "central"]}
`

export const ModalContent = styled.div<{
  $variant?: "central" | "slide-right"
}>`
  background: white;
  padding: 20px;
  position: relative;
  overflow-y: auto;

  ${props => modalContentVariants[props.$variant || "central"]}
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

export const ModalBody = styled.div<{ $variant?: "central" | "slide-right" }>`
  padding: 20px 0;
  font-weight: var(--semibold);

  ${props => modalBodyVariants[props.$variant || "central"]}
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
  width: 100%;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eaeaea;
  padding-top: 10px;
`

export const SaveButton = styled(MipButton)<{
  $variant?: "central" | "slide-right"
}>`
  ${props => buttonVariants[props.$variant || "central"]}
`

export const CancelButton = styled(MipButton)<{
  $variant?: "central" | "slide-right"
}>`
  ${props => buttonVariants[props.$variant || "central"]}
  ${props => props.$variant === "central" && "margin-right: 10px;"}
`
