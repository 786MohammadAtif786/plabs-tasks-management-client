import { io } from "socket.io-client";

// Backend jahan chal raha hai wahi URL daalo (Vite env var use karo agar ho)
// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
// const SOCKET_URL = "https://plabs-tasks-management-backend.onrender.com/api"
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "https://plabs-tasks-management-backend.onrender.com";
// Ek hi socket instance poori app me use hoga
const socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["websocket", "polling"],
});

export default socket;