import axios from 'axios';

import config from '../config/config.js';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = config.backendUrl;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
