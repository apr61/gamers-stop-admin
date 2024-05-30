import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Order,
  CrudType,
  QueryType,
  TableName,
  AddressFormValues,
} from "../../utils/types";
import { RootState } from "../store/store";
import { createAddress, deleteAddress, getAddressesByUserId, updateAddress } from "../../services/api/addresses";
import { searchOrders } from "../../services/api/orders";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: Order | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface OrderState {
  list: {
    data: Order[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    search: {
      data: Order[],
      totalItems: number
    }
  };
  current: CurrentType;
}

const initialState: OrderState = {
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

export const orderSearch = createAsyncThunk(
  "order/search",
  async (query: QueryType, { rejectWithValue }) => {
    try {
      const response = await searchOrders(query);
      if (response) {
        const data = {
          data: response.data as Order[],
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

export const fetchOrdersByUser = createAsyncThunk(
  "order/readAll",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getAddressesByUserId(userId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/create",
  async (
    {
      formData,
    }: {
      formData: AddressFormValues;
    },
    { rejectWithValue }
  ) => {
    try {
      const newEntity = await createAddress(formData);
      return newEntity;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeOrder = createAsyncThunk(
  "order/delete",
  async (data: CrudType, { rejectWithValue }) => {
    try {
      const deletedId = await deleteAddress(data.id);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editOrder = createAsyncThunk(
  "order/edit",
  async (
    {
      formData,
      id,
    }: {
      formData: AddressFormValues;
      tableName: TableName;
      id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateAddress(id, formData);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    setOrderActionType: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetOrderActionType: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
    resetOrderState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderSearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.search.data = action.payload?.data!;
        state.list.search.totalItems = action.payload?.totalCount!;
      })
      .addCase(orderSearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(orderSearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload!;
      })
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data.unshift(action.payload!);
      })
      .addCase(addOrder.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.filter(
          (item) => item.id !== action.payload!
        );
      })
      .addCase(removeOrder.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.map((item) => {
          if (item.id === action.payload?.id) return action.payload as Order;
          return item;
        });
      })
      .addCase(editOrder.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.list;
export const selectOrdersCurrentItem = (state: RootState) =>
  state.orders.current;

export const { setOrderActionType, resetOrderActionType, resetOrderState } =
  ordersSlice.actions;

export default ordersSlice.reducer;
