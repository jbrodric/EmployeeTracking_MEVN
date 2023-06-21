import { redirect } from "react-router-dom";
import backend from "../api/backend.js";

export async function action({ params }) {
  const jobListAPI = new backend.JobListAPI(backend.API_BASE_URL);
  await jobListAPI.deleteJobDB(params.jobId);
  return redirect("/Jobs");
}
