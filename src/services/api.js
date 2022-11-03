import axios from "axios";
import { LOCALHOST_ADDRESS, API_ADDRESS } from "@env";

const localhostAddress = LOCALHOST_ADDRESS;
const apiAddress = API_ADDRESS;

const api = axios.create({
  baseURL: __DEV__
    ? localhostAddress
    : apiAddress,
});
export default api;
