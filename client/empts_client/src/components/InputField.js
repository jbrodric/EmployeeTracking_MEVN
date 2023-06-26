import { TextField, Box } from "@mui/material";
import React from "react";

export default function InputField(props) {
  const { metadata, data } = props;
  let ret;

  switch (metadata.type) {
    case "textarea":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <TextField
            id={metadata.name}
            label={metadata.label}
            variant="outlined"
            name={metadata.name}
            defaultValue={data}
            multiline
            rows={4}
            fullWidth
            size="small"
          />
        </Box>
      );
      break;
    case "text":
    default:
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <TextField
            id={metadata.name}
            label={metadata.label}
            variant="outlined"
            name={metadata.name}
            defaultValue={data}
            fullWidth
            size="small"
          />
        </Box>
      );
  }

  return ret;
}
