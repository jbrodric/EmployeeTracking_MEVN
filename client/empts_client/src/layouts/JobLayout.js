import {
  formatDateUI,
  formatCurrencyUI,
  getCurrency,
  formatNumberUI,
} from "../api/Utils";

export function StdJobLayout() {
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
            name: "title",
            type: "text",
            label: "Title",
            required: true,
          },
          {
            name: "type",
            type: "picklist",
            label: "Type",
            values: [
              "Information Technology",
              "Healthcare",
              "Law",
              "Hospitality",
              "Government",
            ],
            required: true,
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
          {
            name: "dateOpened",
            type: "date",
            label: "Date Opened",
            formatter: formatDateUI,
          },
          {
            name: "active",
            type: "checkbox",
            label: "Active",
          },
          {
            name: "minSalary",
            type: "currency",
            label: "Minimum Salary",
            formatter: formatCurrencyUI,
            getter: getCurrency,
          },
          {
            name: "maxSalary",
            type: "currency",
            label: "Maximum Salary",
            formatter: formatCurrencyUI,
            getter: getCurrency,
          },
          {
            name: "numberOfEmployees",
            type: "number",
            label: "Number of Employees",
            formatter: formatNumberUI,
          },
        ],
      },
      {
        title: "Qualifications",
        numColumns: 2,
        fields: [
          {
            name: "qualification1",
            type: "textarea",
            label: "Qualification 1",
          },
          {
            name: "qualification2",
            type: "textarea",
            label: "Qualification 2",
          },
          {
            name: "qualification3",
            type: "textarea",
            label: "Qualification 3",
          },
          {
            name: "qualification4",
            type: "textarea",
            label: "Qualification 4",
          },
        ],
      },
    ],
  };
}
