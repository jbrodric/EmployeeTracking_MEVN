import { formatNumberUI } from "../api/Utils";

export function CandidateLayout() {
  return {
    sections: [
      {
        title: "Information",
        numColumns: 2,
        fields: [
          {
            name: "name",
            type: "text",
            label: "Name",
            required: true,
          },
          {
            name: "educationLevel",
            type: "picklist",
            label: "Education Level",
            values: [
              "Some High School",
              "High School or Equivalent",
              "Bachelors",
              "Masters",
              "Phd/Doctorate",
            ],
          },
          {
            name: "yearsExperience",
            type: "number",
            label: "Years of Experience",
            formatter: formatNumberUI,
          },
        ],
      },
    ],
  };
}
