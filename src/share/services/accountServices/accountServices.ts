import { hrManagementApi } from "src/share/services/baseApi";
import { User, Response, LoginResp, OUserRole } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

import type { LoginReqBody } from "src/layouts/login-form";
import type { UserRole, GetUserResp } from "src/share/models/accountModels";

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
    getUsers: build.query<GetUserResp, { role: UserRole; page?: number }>({
      query: ({ role, page }) => {
        return {
          url: `users/admin/getAll`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
          params: {
            role: role === OUserRole.All ? "" : role,
            page: page ? page : 1,
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
      providesTags: ["User"],
    }),
    addUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "users/admin/getAll",
          method: "POST",
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
