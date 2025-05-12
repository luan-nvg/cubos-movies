import { styled } from "styled-components";
import { AvatarProps } from "./types";
import Typography from "../Typography";

export const AvatarContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const AvatarImg = styled.img<AvatarProps>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? size : "64px")};
  height: ${({ size }) => (size ? size : "64px")};
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
  outline: ${({ border }) => border && "3px solid #181818"};

  &:hover {
    filter: brightness(0.8);
  }
`;

export const AvatarText = styled(Typography) <AvatarProps>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${(props) => props.textcolor};
  white-space: nowrap;
  text-align: center;
  margin-top: .5rem;
  font-weight: ${(props) => props.textbold};
  text-decoration: ${(props) => props.textunderline};
`;
