import { TextField, Box } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { parseCurrencyUI, formatCurrencyUI } from "../../api/Utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function InputField(props) {
  const { metadata, data } = props;
  let ret;
  const [hasError, setHasError] = React.useState(false);

  switch (metadata.type) {
    case "picklist":
      ret = (
        <>
          <Box sx={{ height: "100%", position: "relative" }}>
            <FormControl fullWidth>
              <InputLabel
                id={metadata.name + "_label"}
                size="small"
                required={metadata.required}
              >
                {metadata.label}
              </InputLabel>
              <Select
                labelId={metadata.name + "_label"}
                id={metadata.name}
                name={metadata.name}
                defaultValue={data}
                label={metadata.label}
                size="small"
                variant="outlined"
                required={metadata.required}
              >
                {metadata.values.map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </>
      );
      break;
    case "number":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <TextField
            id={metadata.name}
            label={metadata.label}
            variant="outlined"
            name={metadata.name}
            defaultValue={metadata.formatter(data)}
            fullWidth
            size="small"
            required={metadata.required}
            error={hasError}
            helperText={hasError ? "Please enter a whole number" : ""}
            onBlur={(event) => {
              let parsedInput = Number.parseFloat(
                parseCurrencyUI(event.target.value)
              );
              let isNotBlank = event.target.value !== "";

              if (Number.isNaN(parsedInput) && isNotBlank) {
                setHasError(true);
                event.target.setCustomValidity("Not a whole number");
                event.target.reportValidity();
              } else {
                event.target.setCustomValidity("");
                event.target.reportValidity();
                setHasError(false);
                event.target.value = metadata.formatter(
                  isNotBlank ? parsedInput : ""
                );
              }
            }}
          />
        </Box>
      );
      break;
    case "checkbox":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <FormControlLabel
            required={metadata.required}
            control={
              <Checkbox
                id={metadata.name}
                name={metadata.name}
                defaultChecked={data ? data : false}
                size="small"
              />
            }
            label={metadata.label}
          />
        </Box>
      );
      break;
    case "currency":
      ret = (
        <Box sx={{ height: "100%", position: "relative" }}>
          <TextField
            id={metadata.name}
            name={metadata.name}
            label={metadata.label}
            placeholder="Please enter a number"
            variant="outlined"
            defaultValue={metadata.formatter(metadata.getter(data))}
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
                event.target.setCustomValidity("Not a number");
                event.target.reportValidity();
              } else {
                event.target.setCustomValidity("");
                event.target.reportValidity();
                setHasError(false);
                event.target.value = formatCurrencyUI(
                  isNotBlank ? parsedInput.toFixed(2) : ""
                );
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
