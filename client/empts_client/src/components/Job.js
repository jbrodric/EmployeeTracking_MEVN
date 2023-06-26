import { useLoaderData } from "react-router-dom";
import backend from "../api/backend.js";
import RecordEdit, { RecordData } from "./RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "./RecordHeader.js";

export async function loader({ params }) {
  const jobListAPI = new backend.JobListAPI(backend.API_BASE_URL);
  let job;

  if (params.jobId) {
    job = await jobListAPI.getJobDB(params.jobId);
    if (!job) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } else job = backend.JobListAPI.createJob("", "");

  return new RecordData(job, {
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
          },
          {
            name: "title",
            type: "text",
            label: "Title",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },
    ],
  });
}

export default function Job() {
  const recordData = useLoaderData();

  return (
    <>
      <RecordHeader
        recordName={recordData.data.name}
        objectName={recordData.metadata.objectName}
      />
      <Paper variant="elevation" elevation={8} className="page">
        <RecordEdit recordData={recordData} mode="view" />
      </Paper>
    </>
  );
}
