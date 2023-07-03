import axios from "axios";
import backend from "./backend";

class JobAppListAPI {
  #JOB_APP_LIST_ENDPOINT_ONE =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_JOB_APP_LIST_API +
    backend.ONE_API;
  #JOB_APP_LIST_ENDPOINT_BULK =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_JOB_APP_LIST_API +
    backend.BULK_API;
  #JOB_APP_LIST_ENDPOINT_SCHEMA =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_JOB_APP_LIST_API +
    backend.SCHEMA_API;

  /**********Util**********/
  static getCurrency(data) {
    return data ? data.$numberDecimal : "";
  }

  /**********Schema**********/
  async getJobAppDBSchema() {
    try {
      const response = await axios.get(this.#JOB_APP_LIST_ENDPOINT_SCHEMA);
      const ret = {};
      for (let key in response.data.keys()) ret[key] = "";
      return ret;
    } catch (error) {
      console.error("Error fetching job application:", error);
    }
  }

  /**********One**********/
  async getJobAppDB(id) {
    try {
      const response = await axios.get(
        this.#JOB_APP_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching job application:", error);
    }
  }

  async createJobAppDB(jobApplication) {
    try {
      const response = await axios.post(
        this.#JOB_APP_LIST_ENDPOINT_ONE,
        jobApplication
      );
      return response.data;
    } catch (error) {
      console.error("Error creating job application:", error);
    }
  }

  async updateJobAppDB(jobApplication) {
    try {
      const response = await axios.put(
        this.#JOB_APP_LIST_ENDPOINT_ONE,
        jobApplication
      );
      return response.data;
    } catch (error) {
      console.error("Error updating job application:", error);
    }
  }

  async deleteJobAppDB(id) {
    try {
      const response = await axios.delete(
        this.#JOB_APP_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  }

  /**********Bulk**********/
  async getJobAppListDB() {
    try {
      const response = await axios.get(this.#JOB_APP_LIST_ENDPOINT_BULK);
      return response.data;
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  }

  async deleteJobAppBulk(jobAppIds) {
    try {
      const response = await axios.delete(this.#JOB_APP_LIST_ENDPOINT_BULK, {
        data: jobAppIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting job applications:", error);
    }
  }
}

export default JobAppListAPI;
