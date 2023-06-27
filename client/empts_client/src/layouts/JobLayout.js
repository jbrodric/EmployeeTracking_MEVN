export function StdJobLayout() {
  return {
    objectName: "Job",
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
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },
    ],
  };
}
