import { hrManagementApi } from "src/share/services/baseApi";
import { User, Response, LoginResp } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

import type { LoginReqBody } from "src/layouts/login-form";

const accessToken = localStorageUtil.get("accessToken");

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
    getUserDetail: build.query<Response<User>, void>({
      query: () => {
        return {
          url: "users/detail",
          method: "GET",
          headers: {
            authorization: accessToken,
          },
        };
      },
      providesTags: ["userDetail"],
    }),
    updateUserDetail: build.mutation<Response<User>, Partial<User>>({
      query(body) {
        return {
          url: "users/update",
          method: "PUT",
          headers: {
            authorization: accessToken,
          },
          body,
        };
      },
      invalidatesTags: ["userDetail"],
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

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useLoginMutation,
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
} = accountServices;
