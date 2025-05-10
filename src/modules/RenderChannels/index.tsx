import * as S from "./styles";
import { ChannelsActions } from "@/components/Actions/ChannelsActions";
import { getChannelData } from "@/utils/channelUtils";

/**
 * Renders the channels column content
 */
export const RenderChannels = (row: any) => {
  if (!row.name_channels) return null;

  return (
    <S.ChannelInputGridContainer key={row?.id}>
      {Object.entries(row.name_channels).map(([channelKey, channelName]) => {
        // Type assertion to let TypeScript know channelName is a string
        const channelNameStr = channelName as string;

        const {
          channelDrive,
          channelStatus,
          socketInstance,
          isSchedulingEnabled,
        } = getChannelData(row, channelKey);

        return (
          <S.ChannelInputColumn key={channelKey}>
            <ChannelsActions
              boardData={row}
              channelKey={channelKey}
              channelName={channelNameStr}
              channelStatus={channelStatus}
              channelDrive={channelDrive}
              socketInstance={socketInstance}
              isSchedulingEnabled={isSchedulingEnabled}
            />
          </S.ChannelInputColumn>
        );
      })}
    </S.ChannelInputGridContainer>
  );
};
