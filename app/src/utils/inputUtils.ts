import { getSocket } from "@/services/Socket";

interface InputInfo {
  inputDrive?: [string, unknown];
  inputStatus: boolean;
  socketInstance?: any;
}

export const getInputData = (row: any, inputKey: string): InputInfo => {
  const inputDrive = Object.entries(row?.value_input || undefined).find(
    ([, value]) => value === row.id
  );

  // alert(JSON.stringify(inputDrive));

  const inputStatus = row?.value_input?.[inputKey] === "1";

  const socketObject = row?.id ? getSocket(row.id) : undefined;
  const socketInstance = socketObject?.instance;

  return {
    inputDrive,
    inputStatus,
    socketInstance,
  };
};

// utils/getSortedInputNames.ts

export const getSortedInputNames = (nameInput: Record<string, string> = {}) => {
  const sortedKeys = Object.keys(nameInput).sort();
  const sortedInputNames: Record<string, string> = {};

  sortedKeys.forEach((key) => {
    sortedInputNames[key] = nameInput[key];
  });

  return sortedInputNames;
};
