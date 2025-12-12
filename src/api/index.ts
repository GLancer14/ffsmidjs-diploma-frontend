import axios from "axios";

const connection = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export default connection;