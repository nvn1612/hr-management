import { hrManagementApi } from "src/share/services";
import {localStorageUtil} from 'src/share/utils'

import type { allDpmResp, Response } from "src/share/models";

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
    }),
  }),
});

export const { useGetDepartmentsQuery } = DepartmentServices;
