import { StyleSheetManager } from "styled-components"
import { ButtonProps } from "./types"
import * as S from "./styles"

const Button = ({
  textbutton,
  onClick,
  bgcolor,
  hoverbgcolor,
  textcolor,
  icon,
  widthbutton,
  heightbutton,
  borderbutton,
  paddingbutton,
  fontweightbutton,
  boxshadowbutton,
  textdecoration,
  textcolorhover,
  iconRight = false,
  ...rest
}: ButtonProps) => {
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== "bgcolor"}>
      <S.StylizedButton
        onClick={onClick}
        textdecoration={textdecoration}
        textcolor={textcolor}
        textcolorhover={textcolorhover}
        bgcolor={bgcolor}
        hoverbgcolor={hoverbgcolor}
        boxshadowbutton={boxshadowbutton}
        borderbutton={borderbutton}
        widthbutton={widthbutton}
        heightbutton={heightbutton}
        paddingbutton={paddingbutton}
        fontweightbutton={fontweightbutton}
        {...rest}
      >
        {iconRight === false && icon && <span>{icon}</span>}
        {textbutton}
        {iconRight && icon && <span>{icon}</span>}
      </S.StylizedButton>
    </StyleSheetManager>
  )
}

export default Button
