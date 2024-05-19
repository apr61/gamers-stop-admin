import { configureStore } from "@reduxjs/toolkit";
import crudStateSlice from "../slice/crudActionsSlice";
import fileHandlingSlice from "../slice/fileHandlingSlice";
import crudSlice from "../slice/crudSlice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    crudState: crudStateSlice,
    fileHandling: fileHandlingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
