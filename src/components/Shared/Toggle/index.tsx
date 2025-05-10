import { StyleSheetManager } from "styled-components";
import * as S from "./styles";
import { ToggleProps } from "./types";

export default function Toggle({
  checked,
  icon,
  size,
  onToggle
}: ToggleProps) {

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "icon"}>
      <S.Label>
        <S.Input
          checked={checked}
          icon={icon}
          type="checkbox"
          size={size}
          onChange={onToggle}
        />
        <S.Switch size={size} icon={icon} />
      </S.Label>
    </StyleSheetManager>
  );
}

