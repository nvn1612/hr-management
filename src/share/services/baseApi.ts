import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3050/",
  }),
  tagTypes: ["User", "userDetail", 'department'],
  endpoints: () => ({}),
});
