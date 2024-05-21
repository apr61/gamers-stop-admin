import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../utils/types";
import { RootState } from "../store/store";
import { readAll } from "../../services/api/crud";

type ProductState = {
  products: Product[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await readAll("products");
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.products = action.payload as Product[]),
          (state.status = "succeeded"),
          (state.error = null);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = [];
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productSlice.reducer;
