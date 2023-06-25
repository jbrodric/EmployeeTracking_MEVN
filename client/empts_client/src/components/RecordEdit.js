import React from "react";
import Section from "./Section.js";
import { Box } from "@mui/material/";

class RecordData {
  constructor(data, metadata) {
    this.data = data;
    this.metadata = metadata;
  }
}

export default function RecordEdit(params) {
  const { recordData } = params;

  return (
    <Box>
      {recordData.metadata.sections.map((section, index) => {
        return (
          <Section
            key={section.title + "_" + index}
            data={recordData.data}
            metadata={section}
          />
        );
      })}
    </Box>
  );
}

export { RecordData };
