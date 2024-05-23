import { hrManagementApi } from "src/share/services";

import type { Department } from "src/share/models";

export const DepartmentServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<Department[], void>({
      query: () => {
        return {
          url: "departments",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDepartmentsQuery } = DepartmentServices;
