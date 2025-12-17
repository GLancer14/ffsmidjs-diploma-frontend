import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  contactPhone: string;
  role: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  contactPhone: "",
  role: ""
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    }
  }
});

export const { updateCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
