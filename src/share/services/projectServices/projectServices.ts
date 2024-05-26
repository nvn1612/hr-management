import type { ProjectResp, Response, Project } from "src/share/models";
import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";

const accessToken = localStorageUtil.get("accessToken");

const projectServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<ProjectResp, { page: number }>({
      query: ({ page }) => {
        return {
          url: `projects/admin/getAll`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
          params: {
            page,
          },
        };
      },
      transformResponse: (response: Response<ProjectResp>) => response.data,
      providesTags: ["project"],
    }),
    createProject: build.mutation<boolean, Partial<Project>>({
      query: (body) => {
        return {
          url: `projects/admin/getAll`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
          body,
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
    deleteProject: build.mutation<boolean, Partial<string>>({
      query: (body) => {
        return {
          url: `projects/admin/delete/${body}`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectServices;
