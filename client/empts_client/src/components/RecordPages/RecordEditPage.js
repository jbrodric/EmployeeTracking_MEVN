import { Form, useLoaderData, redirect } from "react-router-dom";
import backend from "../../api/backend.js";
import RecordEdit, { RecordData } from "../Generic/RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "../Generic/RecordHeader.js";
import { parseUIData } from "../../api/Utils.js";

let recordData;

export async function action(params) {
  const { request, recordId, api, objectName } = params;
  const formData = await request.formData();
  const updates = parseUIData(
    Object.fromEntries(formData),
    recordData.metadata
  );

  if (recordId) {
    updates._id = recordId;
    await backend[api].updateRecordDB(updates);
    return redirect(`/${objectName}/${recordId}`);
  } else {
    const record = await backend[api].createRecordDB(updates);
    return redirect(`/${objectName}/${record._id}`);
  }
}

export default function RecordEditPage(params) {
  const { icon, pageLayout, objectName, buttons } = params;
  recordData = new RecordData(useLoaderData(), pageLayout());

  return (
    <Form method="post" id={`f${objectName}-form`}>
      <RecordHeader
        recordName={recordData.data.name}
        objectName={objectName}
        icon={icon()}
        buttons={buttons}
      />
      <Paper variant="elevation" elevation={8} className="record-page">
        <RecordEdit recordData={recordData} mode="edit" />
      </Paper>
    </Form>
  );
}
