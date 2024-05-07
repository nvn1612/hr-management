import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mock-hr.free.beeceptor.com/" }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
