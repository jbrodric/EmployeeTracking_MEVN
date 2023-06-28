import { Typography, Box, Divider } from "@mui/material";
import React from "react";

export default function OutputField(props) {
  const { metadata, data } = props;
  let ret;
  let formattedData = data;

  switch (metadata.type) {
    case "date":
      formattedData = metadata.formatter(formattedData);
    // eslint-disable-next-line
    case "textarea":
    case "text":
    default:
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <Typography variant="subtitle2">{metadata.label}</Typography>
          <Typography variant="caption">
            {formattedData ? formattedData : <>&nbsp;</>}
          </Typography>
          <Divider absolute={true} />
        </Box>
      );
  }

  return ret;
}
