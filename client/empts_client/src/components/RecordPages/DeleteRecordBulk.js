import { redirect } from "react-router-dom";
import backend from "../../api/backend.js";

export async function action(params) {
  const { request, api, redirectURL } = params;
  const formData = await request.formData();
  const Records = Object.fromEntries(formData);
  Records.Ids = Records.Ids.split(",");
  await backend[api].deleteRecordsBulk(Records);
  return redirect(redirectURL);
}
