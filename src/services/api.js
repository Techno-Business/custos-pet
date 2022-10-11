import axios from "axios";
import { LOCALHOST_ADDRESS } from "@env";

const api = axios.create({
  baseURL: __DEV__
    ? LOCALHOST_ADDRESS
    : "https://custospet.herokuapp.com/",
});

export default api;
