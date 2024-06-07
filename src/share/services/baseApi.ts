import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.100.1.153:3050/",
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
