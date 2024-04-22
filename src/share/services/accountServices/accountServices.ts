import axios from "axios";
import type { LoginFieldType } from "src/layouts/login-form";
import type { loginResponse } from "./models";

const ApiPrefix = "https://mock-hr.free.beeceptor.com/";

export const loginService = async (attemptLogin: LoginFieldType) => {
  const response = await axios<loginResponse>({
    method: "post",
    baseURL: ApiPrefix,
    url: "login",
    data: {
      username: attemptLogin.username,
      password: attemptLogin.password,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    timeout: 5000,
  });
  return response.data;
};
