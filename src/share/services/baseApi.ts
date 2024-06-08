import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = import.meta.env.VITE_REQUEST_API_URL;

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
  }),
  tagTypes: [
    "User",
    "userDetail",
    "department",
    "project",
    "task",
    "activity",
    "assignment",
  ],
  endpoints: () => ({}),
});
