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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StdJobListView } from "./listViews/JobListView.js";
import JobMetadata from "./Object Metadata/Job.js";
import { StdJobLayout } from "./layouts/JobLayout.js";
import { CandidateListView } from "./listViews/CandidateListView.js";
import CandidateMetadata from "./Object Metadata/Candidate.js";
import { CandidateLayout } from "./layouts/CandidateLayout.js";
import { JobApplicationListView } from "./listViews/JobApplicationListView.js";
import JobApplicationMetadata from "./Object Metadata/JobApplication.js";
import { JobApplicationLayout } from "./layouts/JobApplicationLayout.js";

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
            path: "/JobApplications",
            element: (
              <RecordList
                createListViewMeta={JobApplicationListView}
                title="Job Applications"
                recordURL="/JobApplication/"
                recordIdField="_id"
              />
            ),
            loader: () => recordListLoader("JobAppListAPI"),
            action: () => recordListAction("/JobApplication"),
          },
          {
            path: "/JobApplication/:jobApplicationId",
            element: (
              <RecordViewPage
                objectName={JobApplicationMetadata.objectName}
                icon={JobApplicationMetadata.getIcon}
                pageLayout={JobApplicationLayout}
                buttons={["Edit", "Delete", "Back"]}
                backURL="/JobApplications"
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({
                recordId: params.jobApplicationId,
                api: "JobAppListAPI",
              }),
          },
          {
            path: "/JobApplication/:jobApplicationId/edit",
            element: (
              <RecordEditPage
                objectName={JobApplicationMetadata.objectName}
                icon={JobApplicationMetadata.getIcon}
                pageLayout={JobApplicationLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: ({ params }) =>
              recordViewLoader({
                recordId: params.jobApplicationId,
                api: "JobAppListAPI",
              }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                recordId: params.jobApplicationId,
                api: "JobAppListAPI",
                objectName: JobApplicationMetadata.objectName.replace(" ", ""),
              }),
          },
          {
            path: "/JobApplication",
            element: (
              <RecordEditPage
                objectName={JobApplicationMetadata.objectName}
                icon={JobApplicationMetadata.getIcon}
                pageLayout={JobApplicationLayout}
                buttons={["Save", "Cancel"]}
              />
            ),
            loader: () => recordViewLoader({ api: "JobAppListAPI" }),
            action: ({ request, params }) =>
              editRecordAction({
                request,
                api: "JobAppListAPI",
                objectName: JobApplicationMetadata.objectName.replace(" ", ""),
              }),
          },
          {
            path: "/JobApplication/:jobApplicationId/destroy",
            action: ({ params }) =>
              deleteRecordAction({
                api: "JobAppListAPI",
                recordId: params.jobApplicationId,
                redirectURL: "/JobApplications",
              }),
          },
          {
            path: "/JobApplications/destroy",
            action: ({ request }) =>
              deleteRecordActionBulk({
                request: request,
                api: "JobAppListAPI",
                redirectURL: "/JobApplications",
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
