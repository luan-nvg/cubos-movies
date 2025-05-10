import { useState, useEffect, useRef } from "react";
import {
  initSocket,
  endSocket,
  onCallback,
  getSocket,
  isConnected,
} from "@/services/Socket";

// Definição das interfaces
interface Entity {
  id: string;
  N_cx?: any;
  N_res?: any;
  value_channels?: Record<string, any>;
  value_input?: any;
  [key: string]: any; // Para outras propriedades que possam existir
}

interface Board {
  id: string;
  [key: string]: any;
}

interface SocketMessage {
  id_board: string;
  N_cx?: any;
  N_res?: any;
  value_input?: any;
  [key: string]: any; // Para acomodar as propriedades ACx dinâmicas
}

export const useSocketManager = (currentBoards: Board[]) => {
  const [formattedEntities, setFormattedEntities] = useState<Entity[]>([]);
  const activeBoardIdsRef = useRef<string[]>([]);
  const channelsRef = useRef<string[]>([]);
  const previousIdsRef = useRef<string[]>([]);

  // Socket message handler
  const handleSocketMessage = (msg: SocketMessage) => {
    if (!msg || !msg.id_board) {
      console.log("Mensagem inválida recebida:", msg);
      return;
    }

    console.log(`Atualização recebida para board ${msg.id_board}:`, msg);

    setFormattedEntities((prevEntities) => {
      const idx = prevEntities.findIndex((e: Entity) => e.id === msg.id_board);
      if (idx === -1) return prevEntities;

      const newEntities = [...prevEntities];

      // Extract ACx from msg
      const acData = Object.fromEntries(
        Object.entries(msg).filter(([key]) =>
          key.toUpperCase().startsWith("AC")
        )
      );

      // Merge with old value_channels data
      const previousValueChannels = newEntities[idx].value_channels || {};
      const mergedValueChannels = { ...previousValueChannels, ...acData };

      newEntities[idx] = {
        ...newEntities[idx],
        ...(msg.N_cx !== undefined && { N_cx: msg.N_cx }),
        ...(msg.N_res !== undefined && { N_res: msg.N_res }),
        ...(Object.keys(acData).length > 0 && {
          value_channels: mergedValueChannels,
        }),
        ...(msg.value_input !== undefined && { value_input: msg.value_input }),
      };

      return newEntities;
    });
  };

  // Start socket for a specific board
  const startCapturing = async (id_board: string) => {
    if (!id_board) return null;

    // Check if socket already exists and is connected
    if (isConnected(id_board)) {
      console.log(`Socket já conectado para board: ${id_board}`);
      return getSocket(id_board);
    }

    console.log(`Iniciando socket para board: ${id_board}`);

    try {
      // Initialize socket
      const socketObject = initSocket({
        id_board,
        reference: "/board-monitoring",
      });

      if (!socketObject) {
        console.error(`Falha ao iniciar socket para board: ${id_board}`);
        return null;
      }

      // Register callback for channel_drives event
      const channelName = `channel_drives=${id_board}`;
      onCallback({
        socket: socketObject,
        channel: [channelName], // Changed to array of strings to match the expected type
        callback: handleSocketMessage,
      });

      console.log(`Socket inicializado com sucesso para board: ${id_board}`);
      return socketObject;
    } catch (error) {
      console.error(`Erro iniciando socket para board: ${id_board}`, error);
      return null;
    }
  };

  // Clean up sockets that are no longer active
  const cleanupSockets = (activeBoardIds: string[]) => {
    console.log("cleanupSockets", activeBoardIds);
    // Get previous board IDs that are no longer active
    const previousIds = activeBoardIdsRef.current;
    const boardIdsToRemove = previousIds.filter(
      (id) => !activeBoardIds.includes(id)
    );

    // Clean up each socket that's no longer needed
    boardIdsToRemove.forEach((id_board) => {
      console.log(`Desconectando socket para board: ${id_board}`);
      endSocket({ id_board });
    });

    // Update reference with current active board IDs
    activeBoardIdsRef.current = activeBoardIds;
  };

  useEffect(() => {
    if (!currentBoards || currentBoards.length === 0) return;

    const activeBoardIds = currentBoards.map((p: Board) => p.id);

    // Update channels reference
    channelsRef.current = activeBoardIds.map(
      (id: string) => `channel_drives=${id}`
    );

    // Clean up unused sockets
    cleanupSockets(activeBoardIds);

    // Identify new boards that weren't present before
    const currentIds = currentBoards.map((p: Board) => p.id);

    // Converta previousIdsRef.current para um array de strings caso não seja
    const previousIds: string[] = Array.isArray(previousIdsRef.current)
      ? previousIdsRef.current
      : [];

    const newIds = currentIds.filter((id: string) => !previousIds.includes(id));

    if (newIds.length > 0) {
      // Start capturing for new boards
      newIds.forEach((id: string) => {
        console.log("Capturando novo board", id);
        startCapturing(id);
      });
    }

    // Update reference
    previousIdsRef.current = currentIds;
  }, [currentBoards]);

  // Clean up all sockets when component unmounts
  useEffect(() => {
    return () => {
      console.log("Desmontando componente - limpando todos os sockets");
      endSocket({ persistReference: null }); // End all sockets
    };
  }, []);

  return {
    formattedEntities,
    setFormattedEntities,
    channelsRef,
    startCapturing,
  };
};
