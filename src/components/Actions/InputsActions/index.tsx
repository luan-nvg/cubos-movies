import React, { useEffect, useState } from "react";

import SVGXCircle from "../../WaterMonitoring/SVGXCircle";
import SVGCheck from "../../WaterMonitoring/SVGCheck";

import { IconContainer, IconWrapper, IconSpan, InputLabel } from "./styles";

// Define TypeScript interfaces
export interface InputsActionsProps {
  inputName: string;
  inputKey: string;
  inputStatus: boolean;
  inputDrive?: [string, unknown];
  socketInstance?: any; // You may want to use a more specific type for your socket
}

interface SocketMessage {
  success: string;
  [key: string]: any;
}

export const InputsActions = ({
  inputName,
  inputKey,
  inputStatus,
  inputDrive,
  socketInstance,
}: InputsActionsProps): React.ReactElement => {
  const [eStatus, setEStatus] = useState<boolean>(inputStatus);

  useEffect(() => {
    const handleSocketMessage = (msg: SocketMessage) => {
      if (msg.hasOwnProperty(inputKey) && msg.success === "true") {
        setEStatus((prevStatus) => !prevStatus);
      }
    };

    if (socketInstance) {
      socketInstance.on(inputDrive, handleSocketMessage);
    }

    return () => {
      if (socketInstance) {
        socketInstance.off(inputDrive, handleSocketMessage);
      }
    };
  }, [socketInstance, inputDrive, inputKey]);

  return (
    <IconContainer>
      <IconWrapper>
        <IconSpan
          className="svg-icon svg-icon-xl svg-icon-primary"
          active={eStatus}
        >
          {eStatus ? <SVGCheck /> : <SVGXCircle />}
        </IconSpan>
      </IconWrapper>
      <InputLabel>{inputName}</InputLabel>
    </IconContainer>
  );
};
