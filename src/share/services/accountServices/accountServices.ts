import axios from "axios";
import { loginApi } from "src/share/apis";
import Cookies from "js-cookie";
import { hrManagementApi } from "src/share/services/baseApi";

import type { LoginFieldType } from "src/layouts/login-form";
import type { loginResponse } from "./models";
import { User } from "src/share/models";

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

const accountServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => {
        return {
          url: "accounts",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    addUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "accounts",
          meothod: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = accountServices;
