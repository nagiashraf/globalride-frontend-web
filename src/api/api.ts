import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 500) {
      notifications.show({
        title: "Internal Server Error",
        message: "Internal server error, please try again later",
      });
    }

    return Promise.reject(error);
  },
);

export default api;
