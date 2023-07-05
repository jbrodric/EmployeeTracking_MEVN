import { formatCurrencyUI, getCurrency } from "../api/Utils";

export function JobApplicationListView() {
  return [
    {
      id: "name",
      numeric: false,
      type: "text",
      disablePadding: true,
      label: "Name",
    },
    {
      id: "jobPostingId",
      numeric: false,
      type: "lookup",
      disablePadding: false,
      label: "Job Posting",
    },
    {
      id: "desiredSalary",
      numeric: true,
      type: "currency",
      disablePadding: false,
      label: "Desired Salary",
      formatter: formatCurrencyUI,
      getter: getCurrency,
    },
    {
      id: "candidateId",
      numeric: false,
      type: "lookup",
      disablePadding: false,
      label: "Candidate",
    },
  ];
}
