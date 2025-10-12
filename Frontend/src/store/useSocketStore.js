import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  userStatuses: new Map(), // Store user online statuses

  connectSocket: (authUser) => {
    if (get().socket) {
      get().socket.disconnect();
    }

    const socket = io("http://localhost:5001", {
      auth: {
        token: authUser.token || "dummy-token",
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      set({ isConnected: true });

      // Emit user online status
      if (authUser._id) {
        socket.emit("userOnline", authUser._id);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ isConnected: false });
    });

    // Listen for user status changes
    socket.on("userStatusChanged", (data) => {
      console.log("User status changed:", data);
      const { userStatuses } = get();
      userStatuses.set(data.userId, {
        isOnline: data.isOnline,
        lastSeen: data.lastSeen,
      });
      set({ userStatuses: new Map(userStatuses) });
    });

    socket.on("userOffline", (data) => {
      console.log("User went offline:", data);
    });

    set({ socket });
    return socket;
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (messageData) => {
    const { socket } = get();
    if (socket && get().isConnected) {
      socket.emit("sendMessage", messageData);
    }
  },

  joinRoom: (roomId) => {
    const { socket } = get();
    if (socket && get().isConnected) {
      socket.emit("joinRoom", roomId);
    }
  },

  leaveRoom: (roomId) => {
    const { socket } = get();
    if (socket && get().isConnected) {
      socket.emit("leaveRoom", roomId);
    }
  },
}));
