import type {
  ProjectResp,
  Response,
  Project,
  TaskResp,
  Assignment,
} from "src/share/models";
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
          url: `projects/create`,
          method: "POST",
          headers: {
            authorization: accessToken,
          },
          body,
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
    updateProject: build.mutation<
      Project,
      Partial<{ values: Project; projectId: string }>
    >({
      query: (body) => {
        return {
          url: `projects/update/${body.projectId}`,
          method: "PUT",
          headers: {
            authorization: accessToken,
          },
          body: body.values,
        };
      },
      transformResponse: (response: Response<Project>) => response.data,
      invalidatesTags: ["project"],
    }),
    deleteProject: build.mutation<boolean, Partial<string>>({
      query: (body) => {
        return {
          url: `projects/admin/delete/${body}`,
          method: "DELETE",
          headers: {
            authorization: accessToken,
          },
        };
      },
      transformResponse: (response: Response<boolean>) => response.data,
      invalidatesTags: ["project"],
    }),
    getClient: build.query<ProjectResp, { page: number }>({
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
    getFile: build.mutation<string, Partial<{ filename: string }>>({
      query: (body) => {
        return {
          url: `projects/getFile`,
          method: "POST",
          headers: {
            authorization: accessToken,
          },
          body,
        };
      },
      transformResponse: (response: Response<string>) => response.data,
    }),
    getProjectUserProperties: build.query<string[], { projectId?: string }>({
      query: ({ projectId }) => {
        return {
          url: `assignments/getAllUserPropertyFromProject/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
        };
      },
      transformResponse: (response: Response<string[]>) => response.data,
    }),
    getTaskProperties: build.query<string[], { projectId?: string }>({
      query: ({ projectId }) => {
        return {
          url: `/assignments/getAllTaskPropertyFromProject/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
        };
      },
      transformResponse: (response: Response<string[]>) => response.data,
    }),
    getTaskByProperties: build.mutation<
      TaskResp,
      Partial<{
        values: { task_property_ids: string[] };
        params: { page: number };
      }>
    >({
      query: ({ values, params }) => {
        return {
          url: `/tasks/getAllTaskByTaskProperty`,
          method: "GET",
          headers: {
            authorization: accessToken,
          },
          params: {
            ...params,
          },
          body: values,
        };
      },
      transformResponse: (response: Response<TaskResp>) => response.data,
    }),
    createAssigment: build.mutation<
      Assignment,
      Partial<{
        user_property_id?: string;
        project_property_id: string;
        task_property_id?: string;
      }>
    >({
      query(body) {
        return {
          url: "assignments/create",
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (response: Response<Assignment>) => response.data,
    }),
    createTask: build.mutation<
      Response<boolean>,
      Partial<{
        description: string;
      }>
    >({
      query(body) {
        return {
          url: "tasks/create",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetFileMutation,
  useUpdateProjectMutation,
  useGetProjectUserPropertiesQuery,
  useGetTaskByPropertiesMutation,
  useGetTaskPropertiesQuery,
  useCreateAssigmentMutation,
  useCreateTaskMutation,
} = projectServices;
