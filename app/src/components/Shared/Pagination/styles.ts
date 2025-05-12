import { styled } from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button<{
  active?: boolean,
  borderradius: string,
  bgcolor?: string,
  hoverbgcolor?: string,
  activecolor?: string,
  disablecolor?: string,
  disablebgcolor?: string,
  disablehovercolor?: string
}>`
height: 32px;
width: 32px;
  padding: 8px 12px;
  font-size: 1.2rem;
  margin: 0 5px;
  border: none;
  border-radius: ${(props) => props.borderradius || "8px"};
  background-color: ${(props) =>
    props.active ? props.bgcolor || "var(--light-primary)" : props.disablebgcolor || "var(--bg-disabled)"};
  color: ${(props) =>
    props.active ? props.activecolor || "var(--white)" : props.disablecolor || "var(--disabled)"};
  cursor: ${(props) => (props.active ? "pointer" : "pointer")};
  transition: background-color 0.5s ease;
 
  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &.arrow-button {
    padding: 2px 4px;
  }
`;