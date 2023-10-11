import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import "./App.css";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);
  const messagesListener = (message: string) => {
    setMessages([...messages, message]);
  };
  useEffect(() => {
    socket?.on("message", messagesListener);
    return () => {
      socket?.off("message", messagesListener);
    };
  }, [messagesListener]);
  return <>
  <MessageInput send={send}/>
  <Messages messages={messages}/>
  </>;
}

export default App;
