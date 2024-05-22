import { configureStore } from "@reduxjs/toolkit";
import { hrManagementApi } from "src/share/services";
import { hrManagementApii } from "src/share/services";

export const store = configureStore({
  reducer: {
    [hrManagementApi.reducerPath]: hrManagementApi.reducer,
    [hrManagementApii.reducerPath]: hrManagementApii.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([hrManagementApi.middleware, hrManagementApii.middleware]),
});
