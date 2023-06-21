import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import backend from "../api/backend.js";

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
  const { job } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="job-form">
      <label>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={job.title}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" defaultValue={job.description} rows={6} />
      </label>
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
