import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = import.meta.env.VITE_REQUEST_API_URL;

export const hrManagementApi = createApi({
  reducerPath: "hrManagementApi",
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "http://localhost:3050/",
=======
    baseUrl: baseAPI,
>>>>>>> main
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
