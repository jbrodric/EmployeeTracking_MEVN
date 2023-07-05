import { formatCurrencyUI, getCurrency } from "../api/Utils";

export function JobApplicationLayout() {
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
            name: "jobPostingId",
            type: "lookup",
            label: "Job Posting",
            required: true,
          },
          {
            name: "desiredSalary",
            type: "currency",
            label: "Desired Salary",
            formatter: formatCurrencyUI,
            getter: getCurrency,
          },
          {
            name: "candidateId",
            type: "lookup",
            label: "Candidate",
            required: true,
          },
        ],
      },
    ],
  };
}
