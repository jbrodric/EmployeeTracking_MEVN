import { TextField, Box } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function InputField(props) {
  const { metadata, data } = props;
  let ret;

  switch (metadata.type) {
    case "date":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={metadata.label}
              defaultValue={data ? dayjs(data) : null}
              slotProps={{
                textField: {
                  variant: "outlined",
                  name: metadata.name,
                  fullWidth: true,
                  size: "small",
                  required: metadata.required,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      );
      break;
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
            required={metadata.required}
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
            required={metadata.required}
          />
        </Box>
      );
  }

  return ret;
}
