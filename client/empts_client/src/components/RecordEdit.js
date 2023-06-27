import React from "react";
import Section from "./Section.js";
import { Box } from "@mui/material/";

class RecordData {
  constructor(data, metadata) {
    this.data = data;
    this.metadata = metadata;
    this.setNumReadOnlyFieldsInSections();
  }

  setNumReadOnlyFieldsInSections() {
    this.metadata.sections.forEach((section) => {
      let readOnlyFieldCount = 0;
      for (let field of section.fields)
        if (field.readOnly) readOnlyFieldCount++;

      section.numReadOnlyFields = readOnlyFieldCount;
    });
  }
}

export default function RecordEdit(params) {
  const { recordData, mode } = params;

  return (
    <Box>
      {recordData.metadata.sections.map((section, index) => {
        if (
          section.fields.length === section.numReadOnlyFields &&
          mode === "edit"
        )
          return <></>;
        else
          return (
            <Section
              key={section.title + "_" + index}
              data={recordData.data}
              metadata={section}
              mode={mode}
            />
          );
      })}
    </Box>
  );
}

export { RecordData };
