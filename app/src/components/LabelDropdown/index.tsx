import React from "react";
import { LabelDropdownProps } from "./interface";
import * as S from "./styles";

const LabelDropdown: React.FC<LabelDropdownProps> = ({ labeldropdown }) => {
  return (
    <S.DropdownWrapper>
      <S.LabelComponent
        text={labeldropdown?.label?.text}
        htmlFor={labeldropdown?.label?.htmlFor}
        fontweight={labeldropdown?.label?.fontweight}
        color={labeldropdown?.label?.color}
        fontsize={labeldropdown?.label?.fontsize}
        marginbottom={labeldropdown?.label?.marginbottom}
      />
      <S.DropdownComponent
        titledropdown={
          labeldropdown?.dropdown?.titledropdown
            ? labeldropdown?.dropdown?.titledropdown
            : "Selecione uma opção"
        }
        icon={labeldropdown?.dropdown?.icon}
        sections={labeldropdown?.dropdown?.sections}
        bgcolor={labeldropdown?.dropdown?.bgcolor}
        textcolor={labeldropdown?.dropdown?.textcolor}
        widthbutton={labeldropdown?.dropdown?.widthbutton}
        paddingbutton={labeldropdown?.dropdown?.paddingbutton}
        borderbutton={labeldropdown?.dropdown?.borderbutton}
        onSelect={() => labeldropdown?.dropdown?.onSelect}
        hoverbgcolor={labeldropdown?.dropdown?.hoverbgcolor}
        fontweightbutton={labeldropdown?.dropdown?.fontweightbutton}
        bgcolormenu={labeldropdown?.dropdown?.bgcolormenu}
        bordermenu={labeldropdown?.dropdown?.bordermenu}
        borderradiusmenu={labeldropdown?.dropdown?.borderradiusmenu}
        borderradiusitem={labeldropdown?.dropdown?.borderradiusitem}
        fontweightsection={labeldropdown?.dropdown?.fontweightsection}
        hoverbgcoloritem={labeldropdown?.dropdown?.hoverbgcoloritem}
        widthmenu={labeldropdown?.dropdown?.widthmenu}
        paddingitem={labeldropdown?.dropdown?.paddingitem}
        paddingmenu={labeldropdown?.dropdown?.paddingmenu}
        marginmenu={labeldropdown?.dropdown?.marginmenu}
      />
    </S.DropdownWrapper>
  );
};

export default LabelDropdown;
