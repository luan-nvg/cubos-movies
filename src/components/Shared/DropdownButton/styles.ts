import styled from "styled-components";
import { DropdownButtonProps } from "./types";

export const StylizedDropdownButton = styled.select<DropdownButtonProps>`
  background-color: ${(props) => {
    if (props.bgcolor === "primary") return "#FFF";
    if (props.bgcolor === "secondary") return "#2774b3";
    return props.bgcolor || "#fff";
  }};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  border: none;
  border-radius: ${(props) => props.borderradius};
  transition: 0.3s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.37);
  font-size: ${(props) => props.fontsize};
  font-family: Poppins, Helvetica, "sans-serif";
  cursor: pointer;
  color: ${(props: DropdownButtonProps) => {
    if (props.textcolor === "primary") return "#2774b3";
    if (props.textcolor === "secondary") return "#fff";
    return (
      props.textcolor || (props.bgcolor === "primary" ? "#2774b3" : "#fff")
    );
  }};
  &:active {
    border: none !important;
  }
`;
