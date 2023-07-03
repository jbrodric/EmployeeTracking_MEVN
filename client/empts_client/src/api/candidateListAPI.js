import axios from "axios";
import backend from "./backend";

class CandidateListAPI {
  #CANDIDATE_LIST_ENDPOINT_ONE =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_CANDIDATE_LIST_API +
    backend.ONE_API;
  #CANDIDATE_LIST_ENDPOINT_BULK =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_CANDIDATE_LIST_API +
    backend.BULK_API;
  #CANDIDATE_LIST_ENDPOINT_SCHEMA =
    backend.API_BASE_URL +
    backend.REACT_APP_MONGO_CANDIDATE_LIST_API +
    backend.SCHEMA_API;

  /**********Util**********/
  static getCurrency(data) {
    return data ? data.$numberDecimal : "";
  }

  /**********Schema**********/
  async getCandidateDBSchema() {
    try {
      const response = await axios.get(this.#CANDIDATE_LIST_ENDPOINT_SCHEMA);
      const ret = {};
      for (let key in response.data.keys()) ret[key] = "";
      return ret;
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  }

  /**********One**********/
  async getCandidateDB(id) {
    try {
      const response = await axios.get(
        this.#CANDIDATE_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  }

  async createCandidateDB(candidate) {
    try {
      const response = await axios.post(
        this.#CANDIDATE_LIST_ENDPOINT_ONE,
        candidate
      );
      return response.data;
    } catch (error) {
      console.error("Error creating candidate:", error);
    }
  }

  async updateCandidateDB(candidate) {
    try {
      const response = await axios.put(
        this.#CANDIDATE_LIST_ENDPOINT_ONE,
        candidate
      );
      return response.data;
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  }

  async deleteCandidateDB(id) {
    try {
      const response = await axios.delete(
        this.#CANDIDATE_LIST_ENDPOINT_ONE + "/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  }

  /**********Bulk**********/
  async getCandidateListDB() {
    try {
      const response = await axios.get(this.#CANDIDATE_LIST_ENDPOINT_BULK);
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async deleteCandidateBulk(candidateIds) {
    try {
      const response = await axios.delete(this.#CANDIDATE_LIST_ENDPOINT_BULK, {
        data: candidateIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting candidates:", error);
    }
  }
}

export default CandidateListAPI;
