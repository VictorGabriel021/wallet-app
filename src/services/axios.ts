import axios from "axios";

const axiosApi = axios.create({
  baseURL: "/api",
});

export default axiosApi;
