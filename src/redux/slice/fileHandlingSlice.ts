import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFile,
  updateFile,
  uploadFiles,
} from "../../services/api/fileUpload";
import { RootState } from "../store/store";
import { EditFilesType } from "../../utils/types";

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
  }
);

export const removeFiles = createAsyncThunk(
  "fileHandling/remove",
  (url: string[], { rejectWithValue }) => {
    try {
      const response = deleteFile(url);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editFiles = createAsyncThunk(
  "fileHandling/edit",
  (fileData: EditFilesType, { rejectWithValue }) => {
    try {
      const response = updateFile(fileData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const fileHandlingSlice = createSlice({
  name: "fileHandling",
  initialState: initialState,
  reducers: {
    resetFileHandling: (state) => {
      (state.error = null), (state.publicUrls = []), (state.status = "idle");
    },
    setPublicUrls: (state, action) => {
      state.publicUrls = action.payload;
    },
  },
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
      })
      .addCase(removeFiles.fulfilled, (state) => {
        state.publicUrls = [];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(removeFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFiles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.publicUrls = [];
      })
      .addCase(editFiles.fulfilled, (state, action) => {
        state.publicUrls = action.payload as string[];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(editFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editFiles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.publicUrls = [];
      });
  },
});

export const selectFileHandlingData = (state: RootState) => state.fileHandling;
export const { resetFileHandling, setPublicUrls } = fileHandlingSlice.actions;

export default fileHandlingSlice.reducer;
