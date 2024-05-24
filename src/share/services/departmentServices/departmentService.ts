import { hrManagementApi } from "src/share/services";
import {localStorageUtil} from 'src/share/utils'

import type { allDpmResp, Response,Department } from "src/share/models";
import type { AddDepartmentForm } from "src/layouts/modal-departments/modal-add-department";
const accessToken = localStorageUtil.get('accessToken')

export const DepartmentServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<Response<allDpmResp>, void>({
      query: () => {
        return {
          url: "departments/admin/getAll",
          method: "GET",
          headers : {
            authorization: accessToken
          }
        };
      },
      providesTags: ['department']
    }),
    deleteDepartments: build.mutation<Response<Department>, Partial<{departmentId : string}>>({
      query({departmentId}) {
        return {
          url: `departments/admin/delete/${departmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken,
          }
        };
      },
      invalidatesTags : ['department']
    }),
    addDepartment: build.mutation<Response<Department>, Partial<AddDepartmentForm>>({
      query(body) {
        return {
          url: `departments/admin/create`,
          method: "POST",
          headers: {
            authorization: accessToken,
          },
          body
        };
      },
      invalidatesTags : ['department']
    })
  }),
});

export const { useGetDepartmentsQuery, useDeleteDepartmentsMutation,useAddDepartmentMutation } = DepartmentServices;
