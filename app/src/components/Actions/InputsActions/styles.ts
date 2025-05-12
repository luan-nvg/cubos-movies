import styled from "styled-components";

// Styled components
export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

export const IconSpan = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? "green" : "red")};
`;

export const InputLabel = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #888;
`;
