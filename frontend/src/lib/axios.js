// import axios from "axios";

// const instance = axios.create({
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//   },
// });

// export default instance;
// Re-export from config/api.js — use that file directly going forward
export { default, initCsrf, STORAGE_URL } from "../config/api.js";
