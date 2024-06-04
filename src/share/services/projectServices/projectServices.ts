import type {
  ProjectResp,
  Response,
  Project,
  TaskResp,
  Assignment,
  Activity,
  Task,
  AssignmentResp,
  TaskProperty,
  ProjectReportResp,
} from "src/share/models";
import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";

const accessToken = () => localStorageUtil.get("accessToken");

const projectServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<ProjectResp, { page: number }>({
      query: ({ page }) => {
        return {
          url: `projects/admin/getAll`,
          method: "GET",
          headers: {
            authorization: accessToken(),
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
            authorization: accessToken(),
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
            authorization: accessToken(),
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
            authorization: accessToken(),
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
            authorization: accessToken(),
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
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (response: Response<string>) => response.data,
    }),
    getProjectUserProperties: build.query<
      string[],
      { projectPropertyId?: string }
    >({
      query: ({ projectPropertyId }) => {
        return {
          url: `assignments/getAllUserPropertyFromProject/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<string[]>) => response.data,
    }),
    getTaskProperties: build.query<string[], { projectPropertyId?: string }>({
      query: ({ projectPropertyId }) => {
        return {
          url: `assignments/getAllTaskPropertyFromProject/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
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
          url: `tasks/getAllTaskByTaskProperty`,
          method: "POST",
          headers: {
            authorization: accessToken(),
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
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformErrorResponse: (response: Response<Assignment>) => response.data,
    }),
    createTask: build.mutation<
      { task: Task; task_property: TaskProperty },
      Partial<{
        description: string;
      }>
    >({
      query(body) {
        return {
          url: "tasks/create",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (
        response: Response<{ task: Task; task_property: TaskProperty }>
      ) => response.data,
    }),
    getUserActivity: build.query<
      Activity[],
      {
        page?: number | "ALL";
        search?: string;
        items_per_page?: number;
      }
    >({
      query({ page, search, items_per_page }) {
        return {
          url: "activities/getAllActivitiesByYourProperty/",
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || "1",
            search: search ? search : "",
            items_per_page: items_per_page || "10",
          },
        };
      },
      transformResponse: (response: Response<Activity[]>) => response.data,
    }),
    getTaskActivity: build.query<
      Activity[],
      {
        page?: number;
        search?: string;
        items_per_page?: number;
        taskId?: string;
      }
    >({
      query({ page, search, items_per_page, taskId }) {
        return {
          url: `activities/getAllActivitiesFromTask/${taskId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || "1",
            search: search ? search : "",
            items_per_page: items_per_page || "10",
          },
        };
      },
      transformResponse: (response: Response<Activity[]>) => response.data,
    }),
    getTaskFile: build.mutation<string, Partial<{ filename: string }>>({
      query(body) {
        return {
          url: "tasks/getFile",
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      transformResponse: (response: Response<string>) => response.data,
    }),
    getProjectAssignments: build.query<
      AssignmentResp,
      {
        projectPropertyId?: string;
        page?: number;
        itemsPerPage: number | "ALL";
        isAssigned?: boolean;
      }
    >({
      query({ projectPropertyId, page, itemsPerPage, isAssigned }) {
        return {
          url: `assignments/getAllAssignmentForProject/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            isAssignment: isAssigned || "",
            page,
            items_per_page: itemsPerPage,
          },
        };
      },
      transformResponse: (response: Response<AssignmentResp>) => response.data,
    }),
    updateTask: build.mutation<
      Response<boolean>,
      {
        value: { description: string };
        taskId: string;
      }
    >({
      query({ taskId, value }) {
        return {
          url: `assignments/getAllAssignmentForProject/${taskId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          body: value,
        };
      },
    }),
    getProjectReports: build.query<
      ProjectReportResp,
      {
        projectId?: string;
      }
    >({
      query({ projectId }) {
        return {
          url: `gateway/api/access/reportForProject/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectReportResp>) =>
        response.data,
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
  useGetTaskActivityQuery,
  useGetUserActivityQuery,
  useGetTaskFileMutation,
  useGetProjectAssignmentsQuery,
  useGetProjectReportsQuery,
} = projectServices;
