import axios from "axios";

// Axios config with server URL (http://localhost:8000) and credential options to pass JWT Token
export default axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});
