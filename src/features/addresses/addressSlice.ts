import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	Address,
	QueryType,
	AddressFormValues,
} from "@/types/api";
import { RootState } from "@/store/store";
import {
	createAddress,
	deleteAddress,
	getAddressesByUserId,
	searchAddresses,
	updateAddress,
} from "../../services/api/addresses";

export type CurrentType = {
	action: "create" | "read" | "update" | "delete" | "idle";
	record: Address | null;
	status: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
};

interface OrderState {
	list: {
		data: Address[];
		status: "idle" | "pending" | "succeeded" | "failed";
		error: string | null;
	};
	search: {
		data: Address[];
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

export const addressSearch = createAsyncThunk(
	"address/search",
	async (query: QueryType<Address>, { rejectWithValue }) => {
		try {
			const response = await searchAddresses(query);
			if (response) {
				const data = {
					data: response.data as Address[],
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

export const fetchAddressesByUser = createAsyncThunk(
	"address/readAll",
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await getAddressesByUserId(userId);
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
		}
	},
);

export const addAddress = createAsyncThunk(
	"address/create",
	async (
		{
			formData,
		}: {
			formData: AddressFormValues;
		},
		{ rejectWithValue },
	) => {
		try {
			const newEntity = await createAddress(formData);
			return newEntity;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
		}
	},
);

export const removeAddress = createAsyncThunk(
	"address/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const deletedId = await deleteAddress(id);
			return deletedId;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

export const editAddress = createAsyncThunk(
	"address/edit",
	async (
		{
			formData,
			id,
		}: {
			formData: AddressFormValues;
			id: number;
		},
		{ rejectWithValue },
	) => {
		try {
			const data = await updateAddress(id, formData);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

const addressSlice = createSlice({
	name: "address",
	initialState: initialState,
	reducers: {
		setAddressCurrentItem: (
			state,
			action: PayloadAction<Omit<CurrentType, "status" | "error">>,
		) => {
			state.current.record = action.payload.record;
			state.current.action = action.payload.action;
		},
		resetAddressCurrentItem: (state) => {
			state.current = {
				action: "idle",
				record: null,
				status: "idle",
				error: null,
			};
		},
		resetAddressState: (state) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addressSearch.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				state.search.data = action.payload?.data!;
				state.search.totalItems = action.payload?.totalCount!;
			})
			.addCase(addressSearch.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(addressSearch.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.search = {
					data: [],
					totalItems: 0,
				};
			})
			.addCase(fetchAddressesByUser.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				state.list.data = action.payload!;
			})
			.addCase(fetchAddressesByUser.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(fetchAddressesByUser.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.list.data = [];
			})
			.addCase(addAddress.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data.unshift(action.payload!);
			})
			.addCase(addAddress.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(addAddress.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(removeAddress.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data = state.search.data.filter(
					(item) => item.id !== action.payload!,
				);
			})
			.addCase(removeAddress.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(removeAddress.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(editAddress.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data = state.search.data.map((item) => {
					if (item.id === action.payload?.id) return action.payload as Address;
					return item;
				});
			})
			.addCase(editAddress.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(editAddress.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			});
	},
});

export const selectAddresses = (state: RootState) => state.address.list;
export const selectAddressSearch = (state: RootState) => state.address.search;
export const selectAddressCurrentItem = (state: RootState) =>
	state.address.current;

export const {
	setAddressCurrentItem,
	resetAddressCurrentItem,
	resetAddressState,
} = addressSlice.actions;

export default addressSlice.reducer;
