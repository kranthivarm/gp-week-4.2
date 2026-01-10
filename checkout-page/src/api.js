import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000"
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "X-Api-Key": "key_test_abc123",
      "X-Api-Secret": "secret_test_xyz789",
      "Content-Type": "application/json"
    }
});

export default api;
