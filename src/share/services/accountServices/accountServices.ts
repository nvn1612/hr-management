import axios from "axios";
import type { LoginFieldType } from "src/layouts/login-form";
import type { loginResponse } from "./models";
import { loginApi } from "src/share/apis";
import Cookies from "js-cookie";

export const loginService = async (attemptLogin: LoginFieldType) => {
  try {
    const response = await axios<loginResponse>({
      method: "post",
      url: loginApi,
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
    Cookies.set("auth-token", response.data.data.token, {
      expires: 1,
    });
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
