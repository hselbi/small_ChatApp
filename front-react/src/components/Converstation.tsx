import React, { useEffect, useState } from "react";
import { useSocket } from "../context/socket.context";
import { Box, Stack } from "@mui/material";
import TextInput from "./TextInput";
import MessagebBody from "./MessagebBody";

const Converstation = () => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  const deleteMessage = (value: string) => {
    console.log("==============< ", value);
    socket?.emit("messageDelete", value);
  }

  const messagesListener = (message: string) => {
    console.log(messages);
    setMessages([...messages, message]);
  };

  useEffect(() => {
    console.log(socket.id)
    // Attach the messagesListener to the "message" event when the component mounts
    socket?.on("message", messagesListener);

    // Detach the messagesListener when the component unmounts to avoid memory leaks
    return () => {
      socket?.off("message", messagesListener);
    };
  }, [messagesListener]); // Re-run the effect only if messagesListener changes

  return (
    <>
      <Stack>
        <Box
          width={650}
          height={1250}
          bgcolor="grey" // Set your desired background color
        //   color="primary.contrastText" // Set your desired text color
          p={3} // Set padding
          borderRadius={8} // Set border radius
        >
          <MessagebBody messages={messages} deleteMsg={deleteMessage}/>
          {/* Your content goes here */}
          {/* This is a custom box with a width of 400px and height of 850px. */}
          <TextInput send={send} />
        </Box>
      </Stack>
    </>
  );
};

export default Converstation;
