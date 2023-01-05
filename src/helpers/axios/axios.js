import axios from "axios";

const axios_instance = axios.create({
  baseURL: "https://moniez-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axios_instance;
