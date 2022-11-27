import axios from "axios";

const token = localStorage.getItem("access_token"),
  scope = localStorage.getItem("scope");

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  },
  data: {
    scope,
  },
});

export default API;
