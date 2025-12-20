import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/users";

const initialState: User[] = [];

export const foundUsersSlice = createSlice({
  name: "foundUsers",
  initialState,
  reducers: {
    updateFoundUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    }
  }
});

export const { updateFoundUsers } = foundUsersSlice.actions;
export default foundUsersSlice.reducer;
