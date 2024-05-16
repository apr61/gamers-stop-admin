import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFiles } from "../../services/api/fileUpload";
import { RootState } from "../store/store";

type FileHandlingState = {
  status: "idle" | "failed" | "pending" | "succeeded";
  error: string | null;
  publicUrls: string[];
};

const initialState: FileHandlingState = {
  status: "idle",
  error: null,
  publicUrls: [],
};

export const addFiles = createAsyncThunk(
  "fileHandling/upload",
  (files: FileList, { rejectWithValue }) => {
    try {
      const response = uploadFiles(files, "images");
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

const fileHandlingSlice = createSlice({
  name: "fileHandling",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addFiles.fulfilled, (state, action) => {
        state.publicUrls = action.payload as string[];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addFiles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.publicUrls = [];
      });
  },
});

export const selectFileHandlingData = (state: RootState) => state.fileHandling;

export default fileHandlingSlice.reducer;
