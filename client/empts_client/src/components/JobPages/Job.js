import { useLoaderData } from "react-router-dom";
import backend from "../../api/backend.js";
import RecordEdit, { RecordData } from "../Generic/RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "../Generic/RecordHeader.js";
import WorkIcon from "@mui/icons-material/Work";
import { StdJobLayout } from "../../layouts/JobLayout.js";

export async function loader({ params }) {
  const jobListAPI = new backend.JobListAPI();
  let job;

  if (params.jobId) {
    job = await jobListAPI.getJobDB(params.jobId);
    if (!job) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } else job = jobListAPI.getJobDBSchema();

  return new RecordData(job, StdJobLayout());
}

export function getIcon() {
  return (
    <>
      <WorkIcon
        fontSize="large"
        sx={{
          color: "rgb(255,255,255)",
          backgroundColor: "rgb(25, 118, 210)",
          borderRadius: "5px",
          padding: "6px",
        }}
      />
    </>
  );
}

export default function Job() {
  const recordData = useLoaderData();

  return (
    <>
      <RecordHeader
        recordName={recordData.data.name}
        objectName={recordData.metadata.objectName}
        icon={getIcon()}
        buttons={["Edit", "Delete", "Back"]}
        backURL="/Jobs"
      />
      <Paper variant="elevation" elevation={8} className="record-page">
        <RecordEdit recordData={recordData} mode="view" />
      </Paper>
    </>
  );
}
