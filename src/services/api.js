import axios from 'axios';

const api = axios.create({
    baseURL: __DEV__ ? 'http://192.168.0.124:8000' : '',
});

export default api;