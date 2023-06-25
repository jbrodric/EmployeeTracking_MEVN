import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import backend from "../api/backend.js";
import RecordEdit from "./RecordEdit.js";

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
  const navigate = useNavigate();

  return (
    <Form method="post" id="job-form">
      <RecordEdit recordData={recordData} mode="edit" />
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
