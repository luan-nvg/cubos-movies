import React, { useState } from "react";
import { StylizedDropdownButton } from "./styles";
import { DropdownButtonProps } from "./types";
import { StyleSheetManager } from "styled-components";

const DropdownButton = React.forwardRef<HTMLSelectElement, DropdownButtonProps>(({ ...props }, ref) => {
  const [selectedOption, setSelectedOption] = useState('');

  // Função para lidar com a mudança de seleção
  const handleSelectChange = (event: any) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "bgcolor"}>
      <StylizedDropdownButton
        bgcolor={props.bgcolor}
        textcolor={props.textcolor}
        width={props.width}
        height={props.height}
        padding={props.padding}
        fontsize={props.fontsize}
        borderradius={props.borderradius}
        value={selectedOption}
        onChange={handleSelectChange}
        ref={ref}
      >
        {props.menuitems?.length! > 0 ? props.menuitems!.map((option) =>
          <option
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ) : <option value=''>Lista não definida</option>}
      </StylizedDropdownButton>
    </StyleSheetManager>
  );
})

export default DropdownButton;