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
  ActivityResp,
  GetUserResp,
} from "src/share/models";
import { hrManagementApi } from "src/share/services";
import { localStorageUtil } from "src/share/utils";

const accessToken = () => localStorageUtil.get("accessToken");

const projectServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<ProjectResp, { page: number }>({
      query: ({ page }) => {
        return {
          url: `projects/admin/get-all`,
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
          url: `projects/admin/get-all`,
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
          url: `projects/get-file`,
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
          url: `assignments/get-all-user-property-from-project/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<string[]>) => response.data,
      providesTags: ["assignment"],
    }),
    getTaskProperties: build.query<string[], { projectPropertyId?: string }>({
      query: ({ projectPropertyId }) => {
        return {
          url: `assignments/get-all-task-property-from-project/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<string[]>) => response.data,
      providesTags: ["assignment"],
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
          url: `tasks/get-all-task-by-task-property`,
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
      invalidatesTags: ["assignment", "project"],
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
      invalidatesTags: ["task"],
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
          url: "activities/get-all-activities-by-your-property/",
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
        items_per_page?: number | "ALL";
        taskPropertyId?: string;
      }
    >({
      query({ page, search, items_per_page, taskPropertyId }) {
        return {
          url: `activities/get-all-activities-from-task/${taskPropertyId}`,
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
      transformResponse: (response: Response<ActivityResp>) =>
        response.data.data,
      providesTags: ["activity"],
    }),
    createActivity: build.mutation<
      Response<boolean>,
      Partial<{
        description?: string;
        task_property_id?: string;
      }>
    >({
      query(body) {
        return {
          url: `activities/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body,
        };
      },
      invalidatesTags: ["activity"],
    }),
    getTaskFile: build.mutation<string, Partial<{ filename: string }>>({
      query(body) {
        return {
          url: "tasks/get-file",
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
          url: `assignments/get-all-assignment-for-project/${projectPropertyId}`,
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
      providesTags: ["assignment"],
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
          url: `tasks/update/${taskId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: value,
        };
      },
      invalidatesTags: ["task"],
    }),
    updateAssignment: build.mutation<
      Response<boolean>,
      {
        value: { status?: boolean; endAt?: string; user_property_id?: string };
        assigmentId: string;
      }
    >({
      query({ assigmentId, value }) {
        return {
          url: `assignments/update/${assigmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body: value,
        };
      },
      invalidatesTags: ["assignment", "project"],
    }),
    getProjectReports: build.query<
      ProjectReportResp,
      {
        projectId?: string;
      }
    >({
      query({ projectId }) {
        return {
          url: `report/report-for-project/${projectId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      transformResponse: (response: Response<ProjectReportResp>) =>
        response.data,
    }),
    getProjectStaffs: build.query<
      GetUserResp,
      {
        projectPropertyId?: string;
        page?: number;
        items_per_page?: number | "ALL";
      }
    >({
      query({ projectPropertyId, page, items_per_page }) {
        return {
          url: `/users/get-all-staff-in-project/${projectPropertyId}`,
          method: "GET",
          headers: {
            authorization: accessToken(),
          },
          params: {
            page: page || "1",
            items_per_page: items_per_page || "10",
          },
        };
      },
      transformResponse: (response: Response<GetUserResp>) => response.data,
    }),
    deleteAssignment: build.mutation<
      Response<boolean>,
      Partial<{
        assigmentId?: string;
      }>
    >({
      query({ assigmentId }) {
        return {
          url: `assignments/delete/${assigmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["assignment"],
    }),
    deleteTask: build.mutation<
      Response<boolean>,
      Partial<{
        taskId?: string;
      }>
    >({
      query({ taskId }) {
        return {
          url: `tasks/admin/delete/${taskId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          },
        };
      },
      invalidatesTags: ["task"],
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
  useCreateActivityMutation,
  useUpdateTaskMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useDeleteTaskMutation,
  useGetProjectStaffsQuery,
} = projectServices;
