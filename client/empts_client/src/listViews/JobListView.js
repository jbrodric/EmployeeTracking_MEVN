import { formatDateUI } from "../Utils";

export function StdJobListView() {
  return [
    {
      id: "name",
      numeric: false,
      type: "text",
      disablePadding: true,
      label: "Name",
    },
    {
      id: "title",
      numeric: false,
      type: "text",
      disablePadding: true,
      label: "Title",
    },
    {
      id: "description",
      numeric: false,
      type: "text",
      disablePadding: false,
      label: "Description",
    },
    {
      id: "dateOpened",
      numeric: false,
      type: "date",
      disablePadding: false,
      label: "Date Opened",
      formatter: formatDateUI,
    },
  ];
}
