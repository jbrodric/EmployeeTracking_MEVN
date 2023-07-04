import { useLoaderData } from "react-router-dom";
import backend from "../../api/backend.js";
import RecordEdit, { RecordData } from "../Generic/RecordEdit.js";
import { Paper } from "@mui/material";
import RecordHeader from "../Generic/RecordHeader.js";

export async function loader(params) {
  const { recordId, api } = params;
  let record;

  if (recordId) {
    record = await backend[api].getRecordDB(recordId);
    if (!record) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } else record = backend[api].getRecordDBSchema();

  return record;
}

export default function RecordViewPage(props) {
  const { objectName, icon, pageLayout, buttons, backURL } = props;
  const recordData = new RecordData(useLoaderData(), pageLayout());

  return (
    <>
      <RecordHeader
        recordName={recordData.data.name}
        objectName={objectName}
        icon={icon()}
        buttons={buttons}
        backURL={backURL}
      />
      <Paper variant="elevation" elevation={8} className="record-page">
        <RecordEdit recordData={recordData} mode="view" />
      </Paper>
    </>
  );
}
