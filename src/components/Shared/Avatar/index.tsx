import user from "@/assets/User.svg"
import { StyleSheetManager } from "styled-components"
import { AvatarProps } from "./types"
import * as S from "./styles"

function Avatar({
  border = false,
  size,
  alt,
  src,
  text,
  textcolor,
  onClick,
  textbold,
  textunderline,
  ...rest
}: AvatarProps) {
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== "border"}>
      <S.AvatarContainer>
        <S.AvatarImg
          size={size}
          border={border}
          alt={alt ? alt : "User Icon"}
          src={src ? src : user}
          onClick={onClick}
          {...rest}
        />
        {text && typeof text !== "boolean" && typeof text !== "number" && (
          <S.AvatarText
            textcolor={textcolor}
            textbold={textbold}
            textunderline={textunderline}
          >
            {typeof text === "string" ? text : text.content}
          </S.AvatarText>
        )}
      </S.AvatarContainer>
    </StyleSheetManager>
  )
}

export default Avatar
