import { Form, useLoaderData, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import RecordEdit from "./RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "./RecordHeader.js";
import { getIcon } from "./Job.js";

export async function action({ request, params }) {
  const jobListAPI = new backend.JobListAPI(backend.API_BASE_URL);
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if (params.jobId) {
    updates._id = params.jobId;
    await jobListAPI.updateJobDB(updates);
    return redirect(`/Job/${params.jobId}`);
  } else {
    const job = await jobListAPI.createJobDB(updates);
    return redirect(`/Job/${job._id}`);
  }
}

export default function EditContact() {
  const recordData = useLoaderData();

  return (
    <Form method="post" id="job-form">
      <RecordHeader
        recordName={recordData.data.name}
        objectName={recordData.metadata.objectName}
        icon={getIcon()}
        buttons={["Save", "Cancel"]}
      />
      <Paper variant="elevation" elevation={8} className="record-page">
        <RecordEdit recordData={recordData} mode="edit" />
      </Paper>
    </Form>
  );
}
