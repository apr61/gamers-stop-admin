import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Product,
  QueryType,
  TableName,
  ProductFormValues,
  ItemsViewType,
} from "@/types/api";
import { RootState } from "@/store/store";
import {
  createProduct,
  deleteProduct,
  getProducts,
  searchProducts,
  updateProduct,
} from "../../services/api/product";

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
  };
  search: {
    data: Product[];
    totalItems: number;
  };
  current: CurrentType;
  itemsView: ItemsViewType;
}

const initialState: ProductState = {
  list: {
    data: [],
    status: "idle",
    error: null,
  },
  search: {
    data: [],
    totalItems: 0,
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
  itemsView: "GRID",
};

export const productSearch = createAsyncThunk(
  "product/search",
  async (query: QueryType<Product>, { rejectWithValue }) => {
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
  async (id: number, { rejectWithValue }) => {
    try {
      const deletedId = await deleteProduct(id);
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
    setProductCurrentItem: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetProductCurrentItem: (state) => {
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
    setProductItemsView: (state, action: PayloadAction<ItemsViewType>) => {
      state.itemsView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productSearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.search.data = action.payload?.data!;
        state.search.totalItems = action.payload?.totalCount!;
      })
      .addCase(productSearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.search = {
          data: [],
          totalItems: 0,
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
        state.list.data = [];
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.search.data.unshift(action.payload!);
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
        state.search.data = state.search.data.filter(
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
        state.search.data = state.search.data.map((item) => {
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
export const selectProductsSearch = (state: RootState) => state.products.search;
export const selectProdcutsCurrentItem = (state: RootState) =>
  state.products.current;
export const selectProductItemsView = (state: RootState) =>
  state.products.itemsView;

export const {
  setProductCurrentItem,
  resetProductCurrentItem,
  resetProductState,
  setProductItemsView,
} = productSlice.actions;

export default productSlice.reducer;
