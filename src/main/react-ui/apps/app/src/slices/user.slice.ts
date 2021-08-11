import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser, login, logout } from "services/user.service";
import { LoginRequest } from "types/login-request";
import { User } from "types/user";

interface UserState {
  user?: User,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  } as UserState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});