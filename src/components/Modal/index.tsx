import React from "react";
import * as S from "./styles";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: (categoryData: Record<string, any>) => void; // Recebe dados dinâmicos
  children: React.ReactNode; // Para conteúdo dinâmico
  textbuttonSave: string;
  textbuttonCancel?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSave,
  children,
  textbuttonSave = "Salvar",
  textbuttonCancel = "Cancelar",
}) => {
  const handleSave = () => {
    // Implementar lógica para coletar dados do formulário se necessário
    onSave({}); // Substituir com os dados coletados do formulário
  };

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          {children} {/* Renderiza o conteúdo dinâmico aqui */}
        </S.ModalBody>
        <S.ModalFooter>
          <S.CancelButton onClick={onClose} textbutton={textbuttonCancel} />
          <S.SaveButton onClick={handleSave} textbutton={textbuttonSave} />
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
