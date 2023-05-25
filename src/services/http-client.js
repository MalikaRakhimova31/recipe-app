import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:3001",
});

const errorHandler = (error) => {
  return Promise.reject(error.response);
};

request.interceptors.response.use((response) => response, errorHandler);
