// import axios from "axios";

// // in production, there's no localhost so we have to make this dynamic
// const BASE_URL = import.meta.env.VITE_API_URL
// const api = axios.create({
//   baseURL: BASE_URL,
// });

// export default api;

import axios from "axios";

// Get base URL from .env file
const BASE_URL = import.meta.env.VITE_API_URL;

console.log(" BASE_URL loaded:", BASE_URL); //  Debug line (remove later)

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //  optional: use only if backend needs cookies
});

export default api;
