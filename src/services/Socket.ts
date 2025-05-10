import io from "socket.io-client";

const VITE_BACKEND_DOMAIN: string = import.meta.env.VITE_BACKEND_DOMAIN;

// Centralized socket management
class SocketService {
  sockets: any;
  eventListeners: any;
  constructor() {
    this.sockets = {};
    this.eventListeners = {};
  }

  /**
   * Initialize a socket connection for a specific board
   * @param {Object} params - Parameters for socket initialization
   * @param {string} params.id_board - Board ID
   * @param {string} params.reference - Reference identifier (default: "global")
   * @returns {Object|null} Instância do Socket ou null se falhar
   */
  initSocket({
    id_board,
    reference = "global",
  }: {
    id_board: string;
    reference?: string;
  }) {
    if (!id_board) {
      console.error("O ID do quadro é necessário para inicializar o socket");
      return null;
    }

    // Check if socket already exists and is connected
    if (this.sockets[id_board]?.instance?.connected) {
      console.log(`Socket already connected for board: ${id_board}`);
      return this.sockets[id_board];
    }

    try {
      console.log(
        `Initializing socket for board: ${id_board}`,
        VITE_BACKEND_DOMAIN
      );
      // Create socket connection
      const socket = io(VITE_BACKEND_DOMAIN, {
        query: {
          access_token: localStorage.access_token,
          id_board,
        },
      });

      // Initialize event listeners tracking for this socket
      this.eventListeners[id_board] = [];

      // Setup basic socket events
      this.setupBasicEvents(socket, id_board);

      // Store socket instance
      const socketObject = {
        id_board,
        instance: socket,
        reference,
      };

      this.sockets[id_board] = socketObject;
      return socketObject;
    } catch (error) {
      console.error(`Error initializing socket for board ${id_board}:`, error);
      return null;
    }
  }

  /**
   * Setup basic event listeners for the socket
   * @param {Object} socket - Socket.io instance
   * @param {string} id_board - Board ID
   */
  setupBasicEvents(
    socket: {
      on: (
        arg0: string,
        arg1: { (): void; (): void; (err: any): void; (error: any): void }
      ) => void;
    },
    id_board: string | number
  ) {
    const connectHandler = () => {
      console.log(`Socket connected: ${id_board}`);
    };

    const disconnectHandler = () => {
      console.log(`Socket disconnected: ${id_board}`);
    };

    const connectErrorHandler = (err: any, id_board: string) => {
      console.error(`Connection error for board ${id_board}:`, err);
    };

    const authFailedHandler = (error: any, id_board: string) => {
      console.error(`Authentication failed for board ${id_board}:`, error);
    };

    // Register event handlers
    socket.on("connect", connectHandler);
    socket.on("disconnect", disconnectHandler);
    socket.on("connect_error", (...args: any[]) => {
      if (typeof id_board === "string") {
        connectErrorHandler(args[0], id_board); // Passando o erro para a função
      } else {
        console.error("Invalid id_board type for connect_error event");
      }
    });

    socket.on("authFailed", (...args: any[]) => {
      if (typeof id_board === "string") {
        authFailedHandler(args[0], id_board); // Passando o erro para a função
      } else {
        console.error("Tipo inválido de id_board para o evento authFailed");
      }
    });

    // Track these listeners for cleanup
    this.eventListeners[id_board].push(
      { event: "connect", handler: connectHandler },
      { event: "disconnect", handler: disconnectHandler },
      { event: "connect_error", handler: connectErrorHandler },
      { event: "authFailed", handler: authFailedHandler }
    );
  }

  /**
   * Register event listeners for a socket
   * @param {Object} params - Parameters for registering callbacks
   * @param {Object} params.socket - Socket instance
   * @param {Array|string} params.channel - Channel(s) to listen to
   * @param {Function} params.callback - Callback function
   */
  onCallback({
    socket = { instance: null, id_board: "" },
    channel = ["boards_general"],
    callback = (msg: unknown) => {
      console.log(msg);
    },
  }: {
    socket: { instance: any; id_board: string };
    channel?: string | string[];
    callback?: (msg: any) => void;
  }) {
    if (!socket.instance) {
      console.error("Valid socket instance required for registering callbacks");
      return;
    }

    const id_board = socket.id_board;
    const channels = Array.isArray(channel) ? channel : [channel];

    channels.forEach((channelName) => {
      const handler = (msg: any) => {
        // Apenas usaremos `msg` se o callback não for vazio ou se o callback for uma função válida.
        if (callback) {
          console.log(
            `Received update on channel ${channelName} for board ${id_board}:`,
            msg
          );
          callback(msg);
        }
      };

      socket.instance.on(channelName, handler);

      // Track this listener for cleanup
      if (this.eventListeners[id_board]) {
        this.eventListeners[id_board].push({ event: channelName, handler });
      }
    });
  }

  /**
   * End a socket connection
   * @param {Object} params - Parameters for ending socket
   * @param {string} params.id_board - Board ID (optional if persistReference is used)
   * @param {string} params.persistReference - Reference to keep active (optional)
   */
  endSocket({
    id_board,
    persistReference,
  }: {
    id_board?: string;
    persistReference?: boolean;
  }) {
    // If no parameters, disconnect all sockets
    if (id_board === undefined && persistReference === undefined) {
      console.log("Closing all socket connections");
      Object.keys(this.sockets).forEach((boardId) => {
        this.cleanupSocket(boardId);
      });
      this.sockets = {};
      this.eventListeners = {};
      return;
    }

    // If persistReference is provided, disconnect all sockets except those with matching reference
    if (persistReference) {
      console.log(
        `Closing all sockets except those with reference: ${persistReference}`
      );
      Object.keys(this.sockets).forEach((boardId) => {
        if (this.sockets[boardId].reference !== persistReference) {
          this.cleanupSocket(boardId);
          delete this.sockets[boardId];
          delete this.eventListeners[boardId];
        }
      });
      return;
    }

    // Disconnect specific socket
    if (id_board && this.sockets[id_board]) {
      console.log(`Closing socket for board: ${id_board}`);
      this.cleanupSocket(id_board);
      delete this.sockets[id_board];
      delete this.eventListeners[id_board];
    }
  }

  /**
   * Clean up a socket by removing all listeners and disconnecting
   * @param {string} id_board - Board ID
   */
  cleanupSocket(id_board: string) {
    const socket = this.sockets[id_board]?.instance;
    if (!socket) return;

    // Remove all tracked event listeners
    if (this.eventListeners[id_board]) {
      this.eventListeners[id_board].forEach(
        ({
          event,
          handler,
        }: {
          event: string;
          handler: (...args: any[]) => void;
        }) => {
          socket.off(event, handler);
        }
      );
    }

    // Disconnect the socket
    if (socket.connected) {
      socket.disconnect();
    }
  }

  /**
   * Get a socket instance by board ID
   * @param {string} id_board - Board ID
   * @returns {Object|null} Socket instance or null if not found
   */
  getSocket(id_board: string) {
    return this.sockets[id_board] || null;
  }

  /**
   * Check if a socket is connected
   * @param {string} id_board - Board ID
   * @returns {boolean} Connection status
   */
  isConnected(id_board: string) {
    return !!this.sockets[id_board]?.instance?.connected;
  }
}

// Create singleton instance
const socketService = new SocketService();

// Export the singleton methods
export const initSocket = (params: {
  id_board: any;
  reference?: string | undefined;
}) => socketService.initSocket(params);
export const endSocket = (params: {
  id_board?: string;
  persistReference?: any;
}) => socketService.endSocket(params);
export const onCallback = (params: {
  socket: any;
  channel?: string[];
  callback?: (msg: any) => void;
}) => socketService.onCallback(params);
export const getSocket = (id_board: string) =>
  socketService.getSocket(id_board);
export const isConnected = (id_board: string) =>
  socketService.isConnected(id_board);
