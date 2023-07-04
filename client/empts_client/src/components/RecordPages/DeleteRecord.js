import { redirect } from "react-router-dom";
import backend from "../../api/backend.js";

export async function action(params) {
  const { api, recordId, redirectURL } = params;
  await backend[api].deleteRecordDB(recordId);
  return redirect(redirectURL);
}
