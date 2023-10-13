import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8001");

const SocketContext = createContext({ socket });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SocketProvider(props: any) {
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  socket.on("newMessage", (value) => {
    setRooms(value);
  });

  socket.on("join", (value) => {
    setRoomId(value);

    setMessages([]);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        setMessages,
        roomId,
        setRoomId,
        rooms,
        setRooms,
      }}
      {...props}
    />
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
