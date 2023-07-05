import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecordList, {
  loader as recordListLoader,
  action as recordListAction,
} from "./components/RecordPages/RecordListPage.js";
import Root from "./components/root.js";
import ErrorPage from "./error.js";
import RecordViewPage, {
  loader as recordViewLoader,
} from "./components/RecordPages/RecordViewPage.js";
import RecordEditPage, {
  action as editRecordAction,
} from "./components/RecordPages/RecordEditPage.js";
import { action as deleteRecordAction } from "./components/RecordPages/DeleteRecord.js";
import { action as deleteRecordActionBulk } from "./components/RecordPages/DeleteRecordBulk.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import Applications from "./components/Applications.js";
import Candidates from "./components/Candidates.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StdJobListView } from "./listViews/JobListView.js";
import JobMetadata from "./Object Metadata/Job.js";
import { StdJobLayout } from "./layouts/JobLayout.js";
import { CandidateListView } from "./listViews/CandidateListView.js";
import CandidateMetadata from "./Object Metadata/Candidate.js";
import { CandidateLayout } from "./layouts/CandidateLayout.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/Jobs",
            element: (
              <RecordList
                createListViewMeta={StdJobListView}
                title="Jobs"
                recordURL="/Job/"
                recordIdField="_id"
              />
            ),
            loader: () => recordListLoader("JobListAPI"),
            action: () => recordListAction("/Job"),
          },
          {
            path: "/Job/:jobId",
            element: (
              <RecordViewPage
                objectName={JobMetadata.objectName}
                icon={JobMetadata.getIcon}
                pageLayout={StdJobLayout}
                buttons={["Edit", "Delete", "Back"]}
                backURL="/Jobs"
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({ recordId: params.jobId, api: "JobListAPI" }),
          },
          {
            path: "/Job/:jobId/edit",
            element: (
              <RecordEditPage
                objectName={JobMetadata.objectName}
                icon={JobMetadata.getIcon}
                pageLayout={StdJobLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({ recordId: params.jobId, api: "JobListAPI" }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                recordId: params.jobId,
                api: "JobListAPI",
                objectName: JobMetadata.objectName,
              }),
          },
          {
            path: "/Job",
            element: (
              <RecordEditPage
                objectName={JobMetadata.objectName}
                icon={JobMetadata.getIcon}
                pageLayout={StdJobLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: () => recordViewLoader({ api: "JobListAPI" }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                api: "JobListAPI",
                objectName: JobMetadata.objectName,
              }),
          },
          {
            path: "/Job/:jobId/destroy",
            action: ({ params }) =>
              deleteRecordAction({
                api: "JobListAPI",
                recordId: params.jobId,
                redirectURL: "/Jobs",
              }),
          },
          {
            path: "/Jobs/destroy",
            action: ({ request }) =>
              deleteRecordActionBulk({
                request: request,
                api: "JobListAPI",
                redirectURL: "/Jobs",
              }),
          },
          {
            path: "/Candidates",
            element: (
              <RecordList
                createListViewMeta={CandidateListView}
                title="Candidates"
                recordURL="/Candidate/"
                recordIdField="_id"
              />
            ),
            loader: () => recordListLoader("CandidateListAPI"),
            action: () => recordListAction("/Candidate"),
          },
          {
            path: "/Candidate/:candidateId",
            element: (
              <RecordViewPage
                objectName={CandidateMetadata.objectName}
                icon={CandidateMetadata.getIcon}
                pageLayout={CandidateLayout}
                buttons={["Edit", "Delete", "Back"]}
                backURL="/Candidates"
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({
                recordId: params.candidateId,
                api: "CandidateListAPI",
              }),
          },
          {
            path: "/Candidate/:candidateId/edit",
            element: (
              <RecordEditPage
                objectName={CandidateMetadata.objectName}
                icon={CandidateMetadata.getIcon}
                pageLayout={CandidateLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({
                recordId: params.candidateId,
                api: "CandidateListAPI",
              }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                recordId: params.candidateId,
                api: "CandidateListAPI",
                objectName: CandidateMetadata.objectName,
              }),
          },
          {
            path: "/Candidate",
            element: (
              <RecordEditPage
                objectName={CandidateMetadata.objectName}
                icon={CandidateMetadata.getIcon}
                pageLayout={CandidateLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: () => recordViewLoader({ api: "CandidateListAPI" }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                api: "CandidateListAPI",
                objectName: CandidateMetadata.objectName,
              }),
          },
          {
            path: "/Candidate/:candidateId/destroy",
            action: ({ params }) =>
              deleteRecordAction({
                api: "CandidateListAPI",
                recordId: params.candidateId,
                redirectURL: "/Candidates",
              }),
          },
          {
            path: "/Candidates/destroy",
            action: ({ request }) =>
              deleteRecordActionBulk({
                request: request,
                api: "CandidateListAPI",
                redirectURL: "/Candidates",
              }),
          },
          {
            path: "/About",
            element: <About />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/Applications",
            element: <Applications />,
          },
          {
            path: "/Candidates",
            element: <Candidates />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
