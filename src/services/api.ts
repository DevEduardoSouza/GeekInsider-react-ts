import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const API = axios.create({
  baseURL: "https://reqres.in/api/",
});

API.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    config.headers.Authorization = `Bearer ${user?.token}`;

    return config;
  },
  (error) => Promise.reject(error)
);
