// AnimatedAlert.tsx
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface AnimatedAlertProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const AlertWrapper = styled.div<{ type: "success" | "error" | "warning" }>`
  position: fixed;
  font-size: 1.2rem;
  bottom: 1rem;
  right: 1rem;
  padding: 1.6rem;
  font-size: 2.5rem;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ type }) =>
    type === "success" ? "green" : type === "error" ? "red" : "red"};
  animation: ${slideIn} 0.5s ease-in-out, ${slideOut} 0.5s ease-in-out 4.5s;
`;

const AnimatedAlert: React.FC<AnimatedAlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <AlertWrapper type={type}>{message}</AlertWrapper>;
};

export default AnimatedAlert;
