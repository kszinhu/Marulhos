import axios from "axios";
import removeRelationKeys from "../utils/removeRelationKeys";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Serialization

API.interceptors.response.use(({ data, ...config }) => {
  if (data) {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        removeRelationKeys(item);
      });
    } else {
      removeRelationKeys(data);
    }
  }

  return { data, ...config };
});

export default API;
