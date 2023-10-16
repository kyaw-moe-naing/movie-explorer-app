import axios from "axios";
import { useMemo } from "react";
import { PageData, PageFetchParams } from "../models/common";
import { token } from "../util/constants";

axios.defaults.withCredentials = true;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const Http = {
  get: async <T>(url: string, params?: PageFetchParams) => {
    return axios.get<T>(url, {
      params: params,
    });
  },
  getByID: async <T>(url: string, params?: PageFetchParams) => {
    return axios.get<T>(url, {
      params: params,
    });
  },
  post: () => {

  },
  put: () => {

  },
  delete: () => {

  }
}

export default Http;