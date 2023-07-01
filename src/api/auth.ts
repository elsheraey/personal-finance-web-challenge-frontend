import axios from "./axios";

export const register = (email: string, password: string) => {
  return axios.post("auth/register", { email, password });
};

export const login = (email: string, password: string) => {
  return axios.post("auth/login", { email, password });
};
