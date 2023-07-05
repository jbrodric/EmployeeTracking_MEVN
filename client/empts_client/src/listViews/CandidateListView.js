import { formatNumberUI } from "../api/Utils";

export function CandidateListView() {
  return [
    {
      id: "name",
      numeric: false,
      type: "text",
      disablePadding: true,
      label: "Name",
    },
    {
      id: "educationLevel",
      numeric: false,
      type: "picklist",
      disablePadding: false,
      label: "Education Level",
    },
    {
      id: "yearsExperience",
      numeric: true,
      type: "number",
      disablePadding: false,
      label: "Years of Experience",
      formatter: formatNumberUI,
    },
  ];
}
