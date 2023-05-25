import axios from "axios";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const errorHandler = (error) => {
  return Promise.reject(error.response);
};

request.interceptors.response.use((response) => response, errorHandler);
