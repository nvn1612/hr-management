import { hrManagementApi } from "src/share/services/baseApi";
import { User, Response, LoginResp, OUserRole } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

import type { LoginReqBody } from "src/layouts/login-form";
import type {
  UserRole,
  GetUserResp,
  RoleResp,
  CreateUserPartial,
} from "src/share/models/accountModels";

const accessToken = () => localStorageUtil.get("accessToken");

const accountServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Response<LoginResp>, Partial<LoginReqBody>>({
      query(body) {
        return {
          url: "gateway/api/access/login",
          method: "POST",
<<<<<<< HEAD
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
=======
>>>>>>> main
          body,
        };
      },
    }),
<<<<<<< HEAD
=======
    claimPassword: build.mutation<Response<string>, Partial<{ email: string }>>(
      {
        query(body) {
          return {
            url: "users/forget-password",
            method: "POST",
            headers: {
              authorization: accessToken(),
            },
            body,
          };
        },
      }
    ),
    verifyOtp: build.mutation<
      Response<{ email: string }>,
      Partial<{ email: string; token: string }>
    >({
      query(body) {
        return {
          url: "email/verify-token",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
    }),
>>>>>>> main
    getUserDetail: build.query<User, void>({
      query: () => {
        return {
          url: "users/detail",
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<User>) => response.data,
      providesTags: ["userDetail"],
    }),
    updateUserDetail: build.mutation<Response<User>, Partial<User>>({
      query(body) {
        return {
          url: "users/update",
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["userDetail"],
    }),
    getUsers: build.query<
      GetUserResp,
      { role: UserRole; page?: number; search?: string }
    >({
      query: ({ role, page, search }) => {
        return {
          url: `users/admin/get-all`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            role: role === OUserRole.All ? "" : role,
            page: page ? page : 1,
            search: search || "",
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
      providesTags: ["User"],
    }),
    createUser: build.mutation<{ code: number }, Partial<CreateUserPartial>>({
      query(body) {
        return {
          url: "users/create",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
<<<<<<< HEAD
=======
    getAvatar: build.mutation<string, Partial<{ avatar: string }>>({
      query(body) {
        return {
          url: "users/get-avatar",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (reponse: Response<string>) => reponse.data,
    }),
>>>>>>> main
    updateUser: build.mutation<
      Response<boolean>,
      Partial<{ values: User; userId: string }>
    >({
      query(body) {
        return {
          url: `users/admin/update/${body.userId}`,
<<<<<<< HEAD
          method: "PUT",
=======
          method: "POST",
>>>>>>> main
          headers: {
            authorization: accessToken(),
          },
          body: body.values,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<boolean, Partial<{ userId: string }>>({
      query({ userId }) {
        return {
          url: `users/admin/delete/${userId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["User"],
    }),
    changePassword: build.mutation<
      Response<boolean>,
      Partial<{ email: string; password: string }>
    >({
      query(body) {
        return {
          url: "users/change-password",
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
    }),
    getRole: build.query<RoleResp[], void>({
      query() {
        return {
          url: "roles/get-all",
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<RoleResp[]>) => response.data,
    }),
    getUsersByProperties: build.mutation<
      GetUserResp,
      Partial<{ values?: { user_property_ids?: string[] }; page: number }>
    >({
      query({ values, page }) {
        return {
          url: `/users/get-all-staff-by-user-property?page=${page ? page : 1}`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: values,
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
    }),
    getDepartmentStaffs: build.query<
      GetUserResp,
      {
        departmentId?: string;
        page?: number;
        itemsPerPage?: number | "ALL";
      }
    >({
      query({ departmentId, page, itemsPerPage }) {
        return {
          url: `users/admin/get-all-staff-in-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || 1,
            items_per_page: itemsPerPage,
          },
        };
      },
      providesTags: ["User"],
      transformResponse: (response: Response<GetUserResp>) => response.data,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLoginMutation,
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
  useGetRoleQuery,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useGetUsersByPropertiesMutation,
  useGetDepartmentStaffsQuery,
<<<<<<< HEAD
=======
  useClaimPasswordMutation,
  useGetAvatarMutation,
  useVerifyOtpMutation,
>>>>>>> main
} = accountServices;
