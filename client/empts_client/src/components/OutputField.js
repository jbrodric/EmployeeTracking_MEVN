import { Typography, Box, Divider } from "@mui/material";
import React from "react";

export default function OutputField(props) {
  const { metadata, data } = props;
  let ret;

  switch (metadata.type) {
    case "text":
    case "textarea":
    default:
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <Typography variant="subtitle2">{metadata.label}</Typography>
          <Typography variant="caption">{data}</Typography>
          <Divider absolute={true} />
        </Box>
      );
  }

  return ret;
}
