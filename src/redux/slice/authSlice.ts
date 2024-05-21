import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import {
  createNewUserEmailPass,
  loginUserWithEmailPass,
} from "../../services/api/auth";
import { LoginFormValues, SignUpFormValues } from "../../utils/types";
import { RootState } from "../store/store";

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  session: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const createNewUser = createAsyncThunk(
  "auth/createNewUser",
  async (newUser: SignUpFormValues, { rejectWithValue }) => {
    try {
      const data = createNewUserEmailPass(newUser);
      return data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return null;
    }
  },
);

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (newUser: LoginFormValues, { rejectWithValue }) => {
    try {
      const data = loginUserWithEmailPass(newUser);
      return data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return null;
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(createNewUser.fulfilled, loginUser.fulfilled),
        (state, action) => {
          state.user = action.payload?.user as User;
          state.session = action.payload?.session as Session;
          state.status = "succeeded";
          state.isLoggedIn = true;
        },
      )
      .addMatcher(
        isAnyOf(createNewUser.pending, loginUser.pending),
        (state) => {
          state.status = "pending";
        },
      )
      .addMatcher(
        isAnyOf(createNewUser.rejected, loginUser.rejected),
        (state, action) => {
          state.user = null;
          state.session = null;
          state.status = "failed";
          state.error = action.payload as string;
        },
      );
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;
export { createNewUser, loginUser };
export default authSlice.reducer;
