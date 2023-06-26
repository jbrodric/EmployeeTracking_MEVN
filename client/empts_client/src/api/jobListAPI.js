import axios from "axios";

class Job {
  constructor(name, title, description) {
    this.name = name;
    this.title = title;
    this.description = description;
  }
}

class JobListAPI {
  constructor(apiBaseURL) {
    this.jobListEndPoint = apiBaseURL + "api/JobList/";
  }

  static createJob(name, title, description) {
    return new Job(name, title, description);
  }

  async getJobDB(id) {
    try {
      const response = await axios.get(this.jobListEndPoint + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  }

  async getJobListDB() {
    try {
      const response = await axios.get(this.jobListEndPoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  async createJobDB(job) {
    try {
      const response = await axios.post(this.jobListEndPoint, job);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }

  async updateJobDB(job) {
    try {
      const response = await axios.put(this.jobListEndPoint, job);
      return response.data;
    } catch (error) {
      console.error("Error updating job:", error);
    }
  }

  async deleteJobDB(id) {
    try {
      const response = await axios.delete(this.jobListEndPoint + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }
}

export default JobListAPI;
