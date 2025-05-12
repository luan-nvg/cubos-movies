import React from "react"
import * as S from "./styles"

interface ModalProps {
  title: string
  onClose: () => void
  onSave: (categoryData: Record<string, any>) => void
  children: React.ReactNode
  textbuttonSave?: string
  textbuttonCancel?: string
  variant?: "central" | "slide-right"
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSave,
  children,
  textbuttonSave = "Salvar",
  textbuttonCancel = "Cancelar",
  variant = "central",
  className = ""
}) => {
  const handleSave = () => {
    // Implementar lógica para coletar dados do formulário se necessário
    onSave({}) // Substituir com os dados coletados do formulário
  }

  return (
    <S.ModalOverlay
      $variant={variant}
      className={`${variant}-modal ${className}`}
    >
      <S.ModalContent $variant={variant}>
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody $variant={variant}>{children}</S.ModalBody>
        <S.ModalFooter>
          <S.CancelButton
            onClick={onClose}
            textbutton={textbuttonCancel}
            $variant={variant}
          />
          <S.SaveButton
            onClick={handleSave}
            textbutton={textbuttonSave}
            $variant={variant}
          />
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}

export default Modal
