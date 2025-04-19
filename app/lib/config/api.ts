import axios from "axios";
import { API_CONFIG } from "./constants";
import { transformToCamelCase, transformToSnakeCase } from "../utils/transform";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    api_key: API_CONFIG.API_KEY,
  },
});

// Request interceptor - transform to snake_case
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = transformToSnakeCase(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - transform to camelCase
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = transformToCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.data) {
      error.response.data = transformToCamelCase(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
