import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../slice/categoriesSlice";
import crudStateSlice from "../slice/crudStateSlice";
import fileHandlingSlice from "../slice/fileHandlingSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    crudState: crudStateSlice,
    fileHandling: fileHandlingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
