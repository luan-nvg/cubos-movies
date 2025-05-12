import { InputsActions } from "@/components/Actions/InputsActions";
import { getInputData, getSortedInputNames } from "@/utils/inputUtils";
import * as S from "./styles";

export const RenderInputs = (row: any) => {
  if (!row?.name_input) return null;

  const sortedInputNames = getSortedInputNames(row.name_input);

  return (
    <S.CombinedInputGrid>
      {Object.entries(sortedInputNames).map(([inputKey, inputName]) => {
        const { inputDrive, inputStatus, socketInstance } = getInputData(
          row,
          inputKey
        );
        console.log("QUEM E INPUT DRIVE", inputDrive);
        return (
          <S.CombinedChannelInputComponent key={inputKey}>
            <InputsActions
              inputName={inputName}
              inputKey={inputKey}
              inputStatus={inputStatus}
              inputDrive={inputDrive}
              socketInstance={socketInstance}
            />
          </S.CombinedChannelInputComponent>
        );
      })}
    </S.CombinedInputGrid>
  );
};
