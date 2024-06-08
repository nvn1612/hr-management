import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";
import type {
  Response,
  getDepartmentsResp,
  Department,
<<<<<<< HEAD
=======
  ProjectReportResp,
>>>>>>> main
} from "src/share/models";
import { AddDepartmentForm } from "src/share/models/departmentModels";
import { ProjectResp } from "src/share/models/projectModels";
const accessToken = () => localStorageUtil.get("accessToken");

export const DepartmentServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<
      getDepartmentsResp,
      { itemsPerPage?: number | "ALL"; page?: number; search?: string }
    >({
      query: ({ itemsPerPage, page, search }) => {
        return {
<<<<<<< HEAD
          url: `departments/admin/get-All`,
=======
          url: `departments/admin/get-all`,
>>>>>>> main
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
<<<<<<< HEAD
            item_per_page: itemsPerPage ? itemsPerPage : 5,
=======
            items_per_page: itemsPerPage ? itemsPerPage : 10,
>>>>>>> main
            page: page ? page : 1,
            search: search ? search : "",
          },
        };
      },
      transformResponse: (response: Response<getDepartmentsResp>) =>
        response.data,
      providesTags: ["department"],
    }),

    deleteDepartments: build.mutation<
      Response<Department>,
      Partial<{ departmentId: string }>
    >({
      query({ departmentId }) {
        return {
          url: `departments/admin/delete/${departmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["department"],
    }),
    addDepartment: build.mutation<
      Response<Department>,
      Partial<AddDepartmentForm>
    >({
      query(body) {
        return {
          url: `departments/admin/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["department"],
    }),
    updateManagerDepartment: build.mutation<
      Response<{ data: boolean }>,
      { departmentId?: string; managerId?: string }
    >({
      query({ departmentId, managerId }) {
        return {
          url: `departments/admin/update/${departmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: { manager_id: managerId },
        };
      },
      invalidatesTags: ["department", "User"],
    }),
<<<<<<< HEAD
    getReportDepartments: build.query<ProjectResp, { departmentId?: string }>({
=======
    getReportDepartments: build.query<ProjectReportResp[], { departmentId?: string }>({
>>>>>>> main
      query: ({ departmentId }) => {
        return {
          url: `report/report-for-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
<<<<<<< HEAD
      transformResponse: (response: Response<ProjectResp>) => response.data,
=======
      transformResponse: (response: Response<ProjectReportResp[]>) => response.data,
>>>>>>> main
    }),
    getAllProjectDepartment: build.query<
      ProjectResp,
      { departmentId?: string }
    >({
      query: ({ departmentId }) => {
        return {
          url: `projects/get-all-project-in-department/${departmentId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
    }),
    deleteStaffDepartment: build.mutation<
      Response<{ count: number }>,
      { departmentId?: string; listStaff?: string[] }
    >({
      query({ departmentId, listStaff }) {
        return {
          url: `users/remove-staff-from-department/${departmentId}`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            list_user_ids: listStaff,
          },
        };
      },
      invalidatesTags: ["department", "User"],
    }),
    addStaffDepartment: build.mutation<
      Response<{ count: number }>,
      { departmentId?: string; listStaff?: (string | undefined)[] }
    >({
      query({ departmentId, listStaff }) {
        return {
          url: `users/add-user-into-department/${departmentId}`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body: {
            list_user_ids: listStaff,
          },
        };
      },
<<<<<<< HEAD
      invalidatesTags: ["department"],
=======
      invalidatesTags: ["department","User"],
>>>>>>> main
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useDeleteDepartmentsMutation,
  useAddDepartmentMutation,
  useUpdateManagerDepartmentMutation,
  useGetReportDepartmentsQuery,
  useGetAllProjectDepartmentQuery,
  useDeleteStaffDepartmentMutation,
  useAddStaffDepartmentMutation,
} = DepartmentServices;
