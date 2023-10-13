import { Chip, IconButton, Stack } from "@mui/material";
import { Trash } from "@phosphor-icons/react";
import React from "react";

interface MessageBodyProps {
  messages: string[];
  deleteMsg: (val: string) => void;
}

const MessageBody: React.FC<MessageBodyProps> = ({ messages, deleteMsg }) => {
  const handleDelete = (message: string) => {
    // Call the deleteMsg function with the selected message
    deleteMsg(message);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "calc( 100% - 80px )",
        backgroundColor: "#ced4da",
        borderRadius: "24px",
        overflow: "auto",
      }}
    >
      {messages.map((message, i) => (
        <Stack key={i} direction="row" alignItems="center" justifyContent="flex-start">
          <IconButton aria-label="delete" onClick={() => handleDelete(message)}>
            {/* TODO: Add delete icon, e.g., <DeleteIcon /> */}
            <Trash size={32} weight="bold" />
          </IconButton>
          <Chip
            label={message}
            color="primary"
            sx={{
              padding: "10px",
              margin: "20px",
              width: "fit-content",
              borderRadius: "12px",
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default MessageBody;
