import axios from "axios";
import { loginApi } from "src/share/apis";
import Cookies from "js-cookie";
import { hrManagementApi } from "src/share/services/baseApi";
import { User, Response, LoginResp } from "src/share/models";

import type { LoginFieldType, LoginReqBody } from "src/layouts/login-form";
import type {} from "src/pages/login";
import type { loginResponse } from "./models";

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
    login: build.mutation<Response<LoginResp>, Partial<LoginReqBody>>({
      query(body) {
        return {
          url: "gateway/api/access/login",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
          body,
        };
      },
    }),
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

export const { useGetUsersQuery, useAddUserMutation, useLoginMutation } =
  accountServices;
