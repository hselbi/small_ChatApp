import React from "react";
import { Textarea } from "@mui/joy";
import { Button, Stack } from "@mui/material";

const TextInput = ({ send }: { send: (val: string) => void }) => {
  const [value, setValue] = React.useState("");
  return (
    <Stack direction={"row"} alignItems={"center"} m={2} spacing={2}>
      <Textarea
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Try to submit with no text!"
        sx={{ width: "100%", height: "50px", borderRadius: "12px" }}
      />
      <Button variant="contained" onClick={() => send(value)}>
        Send
      </Button>
    </Stack>
  );
};

export default TextInput;
