// utils/channelUtils.ts
import { getSocket } from "@/services/Socket";

interface ChannelInfo {
  channelDrive?: [string, any];
  channelName?: string;
  channelStatus: boolean;
  schedulingKey: string;
  isSchedulingEnabled: boolean;
  socketInstance?: any;
}

export const getChannelData = (row: any, channelKey: string): ChannelInfo => {
  const channelDrive = Object.entries(row?.value_channels || {}).find(
    ([, value]) => value === row.id
  );

  const channelStatus = row?.value_channels?.[channelKey] === "1";
  const schedulingKey = `AG${channelKey.split("AC")[1]}`;
  const isSchedulingEnabled = row?.scheduling?.[schedulingKey] === "1";
  const socketObject = row?.id ? getSocket(row.id) : undefined;
  const socketInstance = socketObject?.instance;

  return {
    channelDrive,
    channelStatus,
    schedulingKey,
    isSchedulingEnabled,
    socketInstance,
  };
};
