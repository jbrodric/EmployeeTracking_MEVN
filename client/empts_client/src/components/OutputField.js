import { Typography, Box, Divider } from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

export default function OutputField(props) {
  const { metadata, data } = props;
  let formattedData = metadata.getter ? metadata.getter(data) : data;

  if (metadata.formatter) formattedData = metadata.formatter(formattedData);

  switch (metadata.type) {
    case "checkbox":
      return (
        <Box sx={{ height: "100%", position: "relative" }}>
          <Typography variant="subtitle2">{metadata.label}</Typography>
          <Checkbox
            id={metadata.name}
            defaultChecked={data}
            disabled={true}
            size="small"
            sx={{ padding: 0 }}
          />
          <Divider absolute={true} />
        </Box>
      );
    case "currency":
    case "date":
    case "textarea":
    case "text":
    default:
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
}
