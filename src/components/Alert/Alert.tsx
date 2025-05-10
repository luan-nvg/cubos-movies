// Alert.tsx
import React from "react";
import styled from "styled-components";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning";
}

const AlertWrapper = styled.div<{ type: "success" | "error" | "warning" }>`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #fff;
  background-color: ${({ type }) =>
    type === "success" ? "green" : type === "error" ? "red" : "orange"};
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return <AlertWrapper type={type}>{message}</AlertWrapper>;
};

export default Alert;
