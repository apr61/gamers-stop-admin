import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import {
	createNewUserEmailPass,
	loginUserWithEmailPass,
	signOut,
} from "@/services/api/auth";
import { LoginFormValues, SignUpFormValues } from "@/types/api";
import { RootState } from "@/store/store";

type AuthState = {
	session: Session | null;
	status: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
};

const initialState: AuthState = {
	session: null,
	status: "idle",
	error: null,
};

const createNewUser = createAsyncThunk(
	"auth/createNewUser",
	async (newUser: SignUpFormValues) => {
		const data = await createNewUserEmailPass(newUser);
		
		if(data){	
			return data.session;
		}
		return null
	}
);

const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (newUser: LoginFormValues) => {
		const data = await loginUserWithEmailPass(newUser);
		
		if(data){	
			return data.session;
		}
		return null
	}
);

const logOutUser = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await signOut();
		} catch (error) {
			if (error instanceof Error) return rejectWithValue(error.message);
			return null;
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCurrentSession: (state, action) => {
			state.session = action.payload;
		},
		setAuthStatus: (state, action) => {
			state.status = action.payload;
		},
		setAuthError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(logOutUser.fulfilled, (state) => {
				state.session = null;
				state.status = "succeeded";
				state.error = null;
			})
			.addMatcher(
				isAnyOf(createNewUser.fulfilled, loginUser.fulfilled),
				(state, action) => {
					const session = action.payload;
					if(session){
						state.session = session as Session;
					}
					state.status = "succeeded";
					state.error = null;
				}
			)
			.addMatcher(
				isAnyOf(createNewUser.pending, loginUser.pending, logOutUser.pending),
				(state) => {
					state.status = "pending";
				}
			)
			.addMatcher(
				isAnyOf(
					createNewUser.rejected,
					loginUser.rejected,
					logOutUser.rejected
				),
				(state, action) => {
					state.session = null;
					state.status = "failed";
					state.error = action.payload as string;
				}
			);
	},
});

export const selectCurrentUser = (state: RootState) => state.auth;
export const { setAuthError, setCurrentSession, setAuthStatus } =
	authSlice.actions;
export { createNewUser, loginUser, logOutUser };
export default authSlice.reducer;
