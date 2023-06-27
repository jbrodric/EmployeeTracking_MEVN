import JobListAPI from "./jobListAPI.js";

function CreateAPI() {
  return {
    API_BASE_URL: process.env.REACT_APP_MONGO_API_BASE_URL,
    JOB_LIST_API: process.env.REACT_APP_MONGO_JOB_LIST_API,
    ONE_API: process.env.REACT_APP_MONGO_ONE_API,
    BULK_API: process.env.REACT_APP_MONGO_BULK_API,
    SCHEMA_API: process.env.REACT_APP_MONGO_SCHEMA_API,
    JobListAPI: JobListAPI,
  };
}

const backend = CreateAPI();

export default backend;
