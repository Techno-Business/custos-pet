import axios from "axios";
import { LOCALHOST_ADDRESS, API_ADDRESS } from "@env";

const api = axios.create({
  baseURL: __DEV__
    ? LOCALHOST_ADDRESS
    : API_ADDRESS,
});

export default api;
