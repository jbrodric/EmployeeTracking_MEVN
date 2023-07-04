import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import backend from "../../api/backend.js";
import Datatable, { DataModel } from "../Generic/Datatable.js";

export async function loader(api) {
  const recordList = await backend[api].getRecordListDB();
  return { recordList };
}

export async function action(createPage) {
  return redirect(createPage);
}

export default function RecordList(props) {
  const { createListViewMeta, title, recordURL, recordIdField } = props;
  const data = new DataModel(useLoaderData().recordList, createListViewMeta());

  return (
    <Datatable
      title={title}
      data={data}
      recordURL={recordURL}
      recordIdField={recordIdField}
      useDense={true}
    />
  );
}
