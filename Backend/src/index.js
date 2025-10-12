import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectdb } from "./lib/db.js";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import User from "./models/user.model.js";

dotenv.config({ path: "./env" });

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  },
});

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Auth API");
});

// Store user socket mappings
const userSocketMap = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle user login/online status
  socket.on("userOnline", async (userId) => {
    try {
      // Store user-socket mapping
      userSocketMap.set(socket.id, userId);
      userSocketMap.set(userId, socket.id);

      // Update user status in database
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
        lastSeen: new Date(),
      });

      // Broadcast to all users that this user is online
      socket.broadcast.emit("userStatusChanged", {
        userId,
        isOnline: true,
        lastSeen: new Date(),
      });

      console.log(`User ${userId} is now online`);
    } catch (error) {
      console.error("Error updating user online status:", error);
    }
  });

  socket.on("sendMessage", (data) => {
    // Broadcast the message to the receiver
    socket.broadcast.emit("newMessage", data.message);
    console.log("Message sent:", data);
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room: ${roomId}`);
  });

  socket.on("disconnect", async () => {
    try {
      const userId = userSocketMap.get(socket.id);
      if (userId) {
        // Update user status to offline in database
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });

        // Broadcast to all users that this user is offline
        socket.broadcast.emit("userStatusChanged", {
          userId,
          isOnline: false,
          lastSeen: new Date(),
        });

        // Clean up mappings
        userSocketMap.delete(socket.id);
        userSocketMap.delete(userId);

        console.log(`User ${userId} went offline`);
      }
      console.log("User disconnected:", socket.id);
    } catch (error) {
      console.error("Error handling user disconnect:", error);
    }
  });
});

connectdb()
  .then(() => {
    server.listen(port, () => {
      console.log(`✅ Server is live at http://localhost:${port}`);
      console.log(`✅ Socket.IO server is running`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
