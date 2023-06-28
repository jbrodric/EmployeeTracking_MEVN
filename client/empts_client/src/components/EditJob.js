import { Form, useLoaderData, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import RecordEdit from "./RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "./RecordHeader.js";
import { getIcon } from "./Job.js";
import { parseUIData } from "../api/Utils.js";

let recordData;

export async function action({ request, params }) {
  const jobListAPI = new backend.JobListAPI();
  const formData = await request.formData();
  const updates = parseUIData(
    Object.fromEntries(formData),
    recordData.metadata
  );

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
  recordData = useLoaderData();

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
