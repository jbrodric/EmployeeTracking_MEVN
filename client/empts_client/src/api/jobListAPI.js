import axios from "axios";
import backend from "./backend";

class Job {
  constructor(name, title, description) {
    this.name = name;
    this.title = title;
    this.description = description;
  }
}

class JobListAPI {
  #JOB_LIST_ENDPOINT_ONE =
    backend.API_BASE_URL + backend.JOB_LIST_API + backend.ONE_API;
  #JOB_LIST_ENDPOINT_BULK =
    backend.API_BASE_URL + backend.JOB_LIST_API + backend.BULK_API;

  static createJob(name, title, description) {
    return new Job(name, title, description);
  }

  async getJobDB(id) {
    try {
      const response = await axios.get(this.#JOB_LIST_ENDPOINT_ONE + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  }

  async createJobDB(job) {
    try {
      console.log(job);
      const response = await axios.post(this.#JOB_LIST_ENDPOINT_ONE, job);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }

  async updateJobDB(job) {
    try {
      const response = await axios.put(this.#JOB_LIST_ENDPOINT_ONE, job);
      return response.data;
    } catch (error) {
      console.error("Error updating job:", error);
    }
  }

  async deleteJobDB(id) {
    try {
      const response = await axios.delete(
        this.#JOB_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }

  /**********Bulk**********/
  async getJobListDB() {
    try {
      const response = await axios.get(this.#JOB_LIST_ENDPOINT_BULK);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  async deleteJobBulk(jobIds) {
    try {
      const response = await axios.delete(this.#JOB_LIST_ENDPOINT_BULK, {
        data: jobIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }
}

export default JobListAPI;
