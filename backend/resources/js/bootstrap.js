import axios from 'axios';
window.axios = axios;

axios.defaults.baseURL = 'http://127.0.0.1:8000'; // 🔑 match Laravel exactly
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';