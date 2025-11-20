import axios from "axios";

const api = axios.create({
  baseURL: "http://10.55.2.48:8443/easyESS/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.interceptors.request.use((config) => {
  const url = config.url || "";

  // Do NOT attach token for Login and OTP APIs
  if (
    url.includes("/loginByToken") ||
    url.includes("/verifyOTP")
  ) {
    return config;
  }

  // Attach token for all other APIs
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
