import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Product,
  CrudType,
  QueryType,
  TableName,
  ProductFormValues,
} from "../../utils/types";
import { RootState } from "../store/store";
import { createProduct, deleteProduct, getProducts, searchProducts, updateProduct } from "../../services/api/product";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: Product | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface ProductState {
  list: {
    data: Product[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    search: {
      data: Product[],
      totalItems: number
    }
  };
  current: CurrentType;
}

const initialState: ProductState = {
  list: {
    data: [],
    status: "idle",
    error: null,
    search: {
      data: [],
      totalItems: 0
    }
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
};

export const productSearch = createAsyncThunk(
  "product/search",
  async (query: QueryType, { rejectWithValue }) => {
    try {
      const response = await searchProducts(query);
      if (response) {
        const data = {
          data: response.data as Product[],
          totalCount: response.count,
        };
        return data;
      }
      return {
        data: [],
        totalCount: 0,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/readAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/create",
  async (
    {
      formData,
    }: {
      formData: ProductFormValues;
      tableName: TableName;
    },
    { rejectWithValue }
  ) => {
    try {
      const newEntity = await createProduct(formData);
      return newEntity;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/delete",
  async (data: CrudType, { rejectWithValue }) => {
    try {
      const deletedId = await deleteProduct(data.id);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async (
    {
      formData,
      id,
    }: {
      formData: ProductFormValues;
      tableName: TableName;
      id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateProduct(id, formData);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductActionType: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetProductActionType: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
    resetProductState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productSearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.search.data = action.payload?.data!;
        state.list.search.totalItems = action.payload?.totalCount!;
      })
      .addCase(productSearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload!;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data.unshift(action.payload!);
      })
      .addCase(addProduct.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.filter(
          (item) => item.id !== action.payload!
        );
      })
      .addCase(removeProduct.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.map((item) => {
          if (item.id === action.payload?.id) return action.payload as Product;
          return item;
        });
      })
      .addCase(editProduct.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.list;
export const selectProdcutsCurrentItem = (state: RootState) =>
  state.products.current;

export const { setProductActionType, resetProductActionType, resetProductState } =
  productSlice.actions;

export default productSlice.reducer;
