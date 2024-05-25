import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../utils/types";
import { RootState } from "../store/store";
import { getCategories } from "../../services/api/categories";

type CategoryState = {
  categories: Category[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        (state.categories = action.payload as Category[]),
          (state.status = "succeeded"),
          (state.error = null);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories = [];
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categorySlice.reducer;
