import { TextField, Box } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { parseCurrencyUI, formatCurrencyUI } from "../api/Utils";

export default function InputField(props) {
  const { metadata, data } = props;
  let ret;
  const [hasError, setHasError] = React.useState(false);

  switch (metadata.type) {
    case "currency":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <input
            id={metadata.name + "_submit"}
            name={metadata.name}
            defaultValue={metadata.getter(data)}
            type="hidden"
            error={hasError}
          />
          <TextField
            id={metadata.name}
            label={metadata.label}
            placeholder="Please enter a number"
            variant="outlined"
            defaultValue={formatCurrencyUI(metadata.getter(data))}
            fullWidth
            size="small"
            required={metadata.required}
            error={hasError}
            helperText={hasError ? "Please enter a valid currency value" : ""}
            onBlur={(event) => {
              let parsedInput = Number.parseFloat(
                parseCurrencyUI(event.target.value)
              );
              let isNotBlank = event.target.value !== "";

              if (Number.isNaN(parsedInput) && isNotBlank) {
                setHasError(true);
              } else {
                let fixedNum = isNotBlank ? parsedInput.toFixed(2) : "";
                setHasError(false);
                document.getElementById(metadata.name + "_submit").value =
                  fixedNum;
                event.target.value = formatCurrencyUI(fixedNum);
              }
            }}
          />
        </Box>
      );
      break;
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
