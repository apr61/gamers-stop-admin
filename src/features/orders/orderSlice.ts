import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	Order,
	QueryType,
	TableName,
	OrderFormValues,
} from "@/types/api";
import { RootState } from "@/store/store";
import {
	createOrder,
	deleteOrder,
	getOrdersByUserId,
	searchOrders,
	updateOrder,
} from "@/services/api/orders";

export type CurrentType = {
	action: "create" | "read" | "update" | "delete" | "idle";
	record: Order | null;
	status: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
};

interface OrderState {
	list: {
		data: Order[];
		status: "idle" | "pending" | "succeeded" | "failed";
		error: string | null;
	};
	search: {
		data: Order[];
		totalItems: number;
	};
	current: CurrentType;
}

const initialState: OrderState = {
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
};

export const orderSearch = createAsyncThunk(
	"order/search",
	async (query: QueryType<Order>, { rejectWithValue }) => {
		try {
			const response = await searchOrders(query);
			if (response) {
				const data = {
					data: response.data,
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
	},
);

export const fetchOrdersByUser = createAsyncThunk(
	"order/readAll",
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await getOrdersByUserId(userId);
			if (response) {
				const data = {
					data: response.data as Order[],
					totalCount: response.totalItems,
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
	},
);

export const addOrder = createAsyncThunk(
	"order/create",
	async (
		{
			formData,
		}: {
			formData: OrderFormValues;
		},
		{ rejectWithValue },
	) => {
		try {
			const newEntity = await createOrder(formData);
			return newEntity;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
		}
	},
);

export const removeOrder = createAsyncThunk(
	"order/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const deletedId = await deleteOrder(id);
			return deletedId;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

export const editOrder = createAsyncThunk(
	"order/edit",
	async (
		{
			formData,
			id,
		}: {
			formData: OrderFormValues;
			tableName: TableName;
			id: number;
		},
		{ rejectWithValue },
	) => {
		try {
			const data = await updateOrder(id, formData);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

const ordersSlice = createSlice({
	name: "orders",
	initialState: initialState,
	reducers: {
		setOrderCurrentItem: (
			state,
			action: PayloadAction<Omit<CurrentType, "status" | "error">>,
		) => {
			state.current.record = action.payload.record;
			state.current.action = action.payload.action;
		},
		resetOrderCurrentItem: (state) => {
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
				state.search.data = action.payload?.data!;
				state.search.totalItems = action.payload?.totalCount!;
			})
			.addCase(orderSearch.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(orderSearch.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.search = {
					data: [],
					totalItems: 0,
				};
			})
			.addCase(fetchOrdersByUser.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				state.search.data = action.payload?.data!;
				state.search.totalItems = action.payload?.totalCount!;
			})
			.addCase(fetchOrdersByUser.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(fetchOrdersByUser.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.search = {
					data: [],
					totalItems: 0,
				};
			})
			.addCase(addOrder.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data.unshift(action.payload!);
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
				state.search.data = state.search.data.filter(
					(item) => item.id !== action.payload!,
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
				state.search.data = state.search.data.map((item) => {
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
export const selectOrderSearch = (state: RootState) => state.orders.search;

export const { setOrderCurrentItem, resetOrderCurrentItem, resetOrderState } =
	ordersSlice.actions;

export default ordersSlice.reducer;
