import { redirect } from "react-router-dom";
import backend from "../api/backend.js";

export async function action({ request }) {
  const jobListAPI = new backend.JobListAPI();
  const formData = await request.formData();
  const Jobs = Object.fromEntries(formData);
  Jobs.Ids = Jobs.Ids.split(",");
  await jobListAPI.deleteJobBulk(Jobs);
  return redirect("/Jobs");
}
