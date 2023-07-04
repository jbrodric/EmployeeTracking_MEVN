import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_MONGO_API_BASE_URL,
  ONE_API = process.env.REACT_APP_MONGO_ONE_API,
  BULK_API = process.env.REACT_APP_MONGO_BULK_API,
  SCHEMA_API = process.env.REACT_APP_MONGO_SCHEMA_API,
  JOB_LIST_API = process.env.REACT_APP_MONGO_JOB_LIST_API,
  JOB_APP_LIST_API = process.env.REACT_APP_MONGO_JOB_APP_LIST_API,
  CANDIDATE_LIST_API = process.env.REACT_APP_MONGO_CANDIDATE_LIST_API;

class RecordAPI {
  #RECORD_LIST_ENDPOINT_ONE;
  #RECORD_LIST_ENDPOINT_BULK;
  #RECORD_LIST_ENDPOINT_SCHEMA;
  #RECORD_NAME_SING;

  constructor(API_PATH, recordNameSingular) {
    this.#RECORD_LIST_ENDPOINT_ONE = API_BASE_URL + API_PATH + ONE_API;
    this.#RECORD_LIST_ENDPOINT_BULK = API_BASE_URL + API_PATH + BULK_API;
    this.#RECORD_LIST_ENDPOINT_SCHEMA = API_BASE_URL + API_PATH + SCHEMA_API;
    this.#RECORD_NAME_SING = recordNameSingular;
  }

  /**********Util**********/
  static getCurrency(data) {
    return data ? data.$numberDecimal : "";
  }

  /**********Schema**********/
  async getRecordDBSchema() {
    try {
      const response = await axios.get(this.#RECORD_LIST_ENDPOINT_SCHEMA);
      const ret = {};
      for (let key in response.data) ret[key] = "";
      return ret;
    } catch (error) {
      console.error(`Error fetching ${this.#RECORD_NAME_SING} Schema:`, error);
    }
  }

  /**********One**********/
  async getRecordDB(id) {
    try {
      const response = await axios.get(
        this.#RECORD_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.#RECORD_NAME_SING}:`, error);
    }
  }

  async createRecordDB(record) {
    try {
      const response = await axios.post(this.#RECORD_LIST_ENDPOINT_ONE, record);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.#RECORD_NAME_SING}:`, error);
    }
  }

  async updateRecordDB(record) {
    try {
      const response = await axios.put(this.#RECORD_LIST_ENDPOINT_ONE, record);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.#RECORD_NAME_SING}:`, error);
    }
  }

  async deleteRecordDB(id) {
    try {
      const response = await axios.delete(
        this.#RECORD_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${this.#RECORD_NAME_SING}:`, error);
    }
  }

  /**********Bulk**********/
  async getRecordListDB() {
    try {
      const response = await axios.get(this.#RECORD_LIST_ENDPOINT_BULK);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.#RECORD_NAME_SING}s:`, error);
    }
  }

  async deleteRecordsBulk(recordIds) {
    try {
      const response = await axios.delete(this.#RECORD_LIST_ENDPOINT_BULK, {
        data: recordIds,
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${this.#RECORD_NAME_SING}:`, error);
    }
  }
}

const backend = {
  JobListAPI: new RecordAPI(JOB_LIST_API, "Job"),
  JobAppListAPI: new RecordAPI(JOB_APP_LIST_API, "Job Application"),
  CandidateListAPI: new RecordAPI(CANDIDATE_LIST_API, "Candidate"),
  RecordAPI: RecordAPI, //for static methods
};

export default backend;
