import React, { useEffect, useState } from "react";
import MessageInput from "../../../components/MessageInput";
import Messages from "../../../components/Messages";
import { useSocket } from "../../../context/socket.context";

const Chat = () => {
  // Get the socket instance from the socket context
  const { socket } = useSocket();

  // State to manage the list of messages
  const [messages, setMessages] = useState<string[]>([]);

  // Function to send a new message through the socket
  const send = (value: string) => {
    socket?.emit("message", value);
  };

  // Listener for incoming messages from the socket
  const messagesListener = (message: string) => {
    // Update the state with the new message
    setMessages([...messages, message]);
  };

  useEffect(() => {
    // Attach the messagesListener to the "message" event when the component mounts
    socket?.on("message", messagesListener);

    // Detach the messagesListener when the component unmounts to avoid memory leaks
    return () => {
      socket?.off("message", messagesListener);
    };
  }, [messagesListener]); // Re-run the effect only if messagesListener changes

  return (
    <>
      {/* MessageInput component for sending messages */}
      <MessageInput send={send} />

      {/* Messages component to display the list of messages */}
      <Messages messages={messages} />
    </>
  );
};

export default Chat;
