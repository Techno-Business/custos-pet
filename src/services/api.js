import axios from "axios";
import { LOCALHOST_ADDRESS, API_ADDRESS } from "@env";

//const localhostAddress = LOCALHOST_ADDRESS
//const apiAddress = API_ADDRESS;

const api = axios.create({
  baseURL: __DEV__
    ? "http://192.168.15.5:8000"
    : "https://custospet.herokuapp.com/",
});

export default api;
