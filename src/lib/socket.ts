import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string || "http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
