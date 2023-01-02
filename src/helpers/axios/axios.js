import axios from "axios";

const axios_instance = axios.create({
  baseURL: "http://192.168.0.109:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(axios_instance);
export default axios_instance;
