import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../types";

export interface UserState {
  data: User;
}

const initialState: UserState = {
  data: {
    email: "",
    id: "",
    joinedAt: null,
    name: "",
    role: "USER",
    surname: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;
const userReducer = userSlice.reducer;
export default userReducer;
