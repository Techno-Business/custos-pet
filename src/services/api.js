import axios from "axios";

const api = axios.create({
  baseURL: __DEV__
    ? "http://192.168.15.8:8000/"
    : "https://custospet.herokuapp.com/",
});

export default api;
