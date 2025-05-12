import { useState, useEffect } from "react";
import SVGPower from "../../WaterMonitoring/SVGPower";
import { OverlayTrigger, Tooltip } from "@/components/WaterMonitoring/Tooltip";
import { BoardsCodesActivations } from "../BoardsCodesActivations";
import api from "@/api/axios";

import {
  ButtonDiv,
  ActionButton,
  DisabledButton,
  ChannelNameText,
  StatusIndicator,
  ButtonWrapper,
} from "./styles";

interface ChannelsActionsProps {
  boardData: {
    id: string;
    [key: string]: any;
  };
  channelKey: string;
  channelName: string;
  channelStatus: boolean;
  channelDrive?: [string, unknown];
  socketInstance?: any;
  isSchedulingEnabled: boolean;
}

export function ChannelsActions({
  boardData,
  channelKey,
  channelName,
  channelStatus,
  isSchedulingEnabled,
}: ChannelsActionsProps): any {
  useEffect(() => {
    setAcStatus(channelStatus);
  }, [channelStatus]);

  const [acStatus, setAcStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Função para acionar o canal usando axios
  const handleToggle = (): void => {
    if (isSchedulingEnabled) return;

    setLoading(true);
    const turnOnOrOff = acStatus
      ? BoardsCodesActivations.TURN_OFF
      : BoardsCodesActivations.TURN_ON;
    const cod = channelKey.replace(/AC/g, "");
    const url = `${boardData.id}?cod=?${cod}${turnOnOrOff}`;

    api
      .get(`/boards/info/${url}`)
      .then(() => {
        // Commented socket code removed to fix TS errors
      })
      .catch((error) => {
        console.log("Erro ao acionar canal:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const tooltipContent = (
    <Tooltip id={`scheduling-tooltip-${channelKey}`}>
      <span>
        Modo automático está habilitado, acesse o aplicativo para desabilitar e
        prosseguir
      </span>
    </Tooltip>
  );

  return (
    <ButtonDiv>
      {/* Indicador de status */}
      <StatusIndicator acStatus={acStatus}>
        {acStatus ? "Ligado" : "Desligado"}
      </StatusIndicator>

      {isSchedulingEnabled ? (
        <OverlayTrigger placement="top" overlay={tooltipContent}>
          <ButtonWrapper>
            <DisabledButton disabled>
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVGPower />
              </span>
            </DisabledButton>
          </ButtonWrapper>
        </OverlayTrigger>
      ) : (
        <ActionButton
          acStatus={acStatus}
          onClick={handleToggle}
          loading={loading}
          disabled={loading}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVGPower />
          </span>
        </ActionButton>
      )}
      <ChannelNameText>{channelName}</ChannelNameText>
    </ButtonDiv>
  );
}

export default ChannelsActions;
