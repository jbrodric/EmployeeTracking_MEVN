import React from "react";
import { Box, Typography } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import OutputField from "./OutputField";
import InputField from "./InputField";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
  },
  marginBottom: "20px;",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function RecordEdit(params) {
  const { data, metadata, mode } = params;
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{metadata.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container rowSpacing={3} columnSpacing={10}>
            {metadata.fields.map((field, index) => {
              if (mode === "view")
                return (
                  <Grid
                    xs={12}
                    sm={12 / metadata.numColumns}
                    key={field.name + "_" + index}
                  >
                    <OutputField data={data[field.name]} metadata={field} />
                  </Grid>
                );
              else
                return (
                  <Grid
                    xs={12}
                    sm={12 / metadata.numColumns}
                    key={field.name + "_" + index}
                  >
                    <InputField data={data[field.name]} metadata={field} />
                  </Grid>
                );
            })}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
