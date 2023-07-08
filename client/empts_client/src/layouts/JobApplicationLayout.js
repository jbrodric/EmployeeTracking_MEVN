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
            url: "/Job/",
            recordId: "_id",
            recordName: "name",
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
            url: "/candidate/",
            label: "Candidate",
            recordId: "_id",
            recordName: "name",
            required: true,
          },
        ],
      },
    ],
  };
}
