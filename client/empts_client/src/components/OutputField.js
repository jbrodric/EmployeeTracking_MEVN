import { Typography, Box, Divider } from "@mui/material";
import React from "react";

export default function OutputField(props) {
  const { metadata, data } = props;
  let formattedData = metadata.getter ? metadata.getter(data) : data;

  switch (metadata.type) {
    case "currency":
      formattedData = metadata.formatter(formattedData);
      break;
    case "date":
      formattedData = metadata.formatter(formattedData);
      break;
    case "textarea":
    case "text":
    default:
      formattedData = data;
  }

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="subtitle2">{metadata.label}</Typography>
      <Typography variant="caption">
        {formattedData ? formattedData : <>&nbsp;</>}
      </Typography>
      <Divider absolute={true} />
    </Box>
  );
}
