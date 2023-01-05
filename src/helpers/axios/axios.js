import axios from "axios";

const axios_instance = axios.create({
  baseURL: "http://192.168.0.138:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axios_instance;
