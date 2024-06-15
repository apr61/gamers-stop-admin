import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryFormValues,
  ItemsViewType,
  QueryType,
} from "@/types/api";
import { RootState } from "@/store/store";
import {
  createCategory,
  deleteCategory,
  getCategories,
  searchCategories,
  updateCategory,
} from "../../services/api/categories";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete" | "idle";
  record: Category | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface CategoryState {
  list: {
    data: Category[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  search: {
    data: Category[];
    totalItems: number;
  };
  current: CurrentType;
  itemsView: ItemsViewType;
}

const initialState: CategoryState = {
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
    action: "idle",
    record: null,
    status: "idle",
    error: null,
  },
  itemsView: "LIST",
};

export const categorySearch = createAsyncThunk(
  "category/search",
  async (query: QueryType<Category>, { rejectWithValue }) => {
    try {
      const response = await searchCategories(query);
      if (response) {
        const data = {
          data: response.data as Category[],
          totalItems: response.count,
        };
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return {
        data: [],
        totalItems: 0,
      };
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "category/readAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/create",
  async (
    formData: CategoryFormValues,

    { rejectWithValue }
  ) => {
    try {
      const newEntity = await createCategory(formData);
      return newEntity;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const deletedId = await deleteCategory(id);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async (
    {
      formData,
      id,
    }: {
      formData: CategoryFormValues;
      id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateCategory(id, formData);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategoryCurrentItem: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetCategoryCurrentItem: (state) => {
      state.current = initialState.current;
    },
    resetCategoryState: (state) => {
      state = initialState;
    },
    setCategoryItemsView: (state, action: PayloadAction<ItemsViewType>) => {
      state.itemsView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categorySearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.search.data = action.payload?.data!;
        state.search.totalItems = action.payload?.totalItems!;
      })
      .addCase(categorySearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(categorySearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.search = {
          data: [],
          totalItems: 0,
        };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload!;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.data = [];
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.search.data.unshift(action.payload!);
      })
      .addCase(addCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.search.data = state.search.data.filter(
          (item) => item.id !== action.payload!
        );
      })
      .addCase(removeCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.search.data = state.search.data.map((item) => {
          if (item.id === action.payload?.id) return action.payload as Category;
          return item;
        });
      })
      .addCase(editCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories.list;
export const selectCategoriesSearch = (state: RootState) =>
  state.categories.search;
export const selectCategoryCurrentItem = (state: RootState) =>
  state.categories.current;
export const selectCategoryItemsView = (state: RootState) => state.categories.itemsView

export const {
  setCategoryCurrentItem,
  resetCategoryCurrentItem,
  resetCategoryState,
  setCategoryItemsView,
} = categorySlice.actions;

export default categorySlice.reducer;
