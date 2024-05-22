import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mock-hr.free.beeceptor.com/api",
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
export const hrManagementApii = createApi({
  reducerPath: "hrManagementApii",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mock-hr.free.beeceptor.com/" }),
  tagTypes: ["Departments"],
  endpoints: () => ({}),
});
