import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  contactPhone: string;
  role?: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  contactPhone: "",
  role: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    }
  }
});

export const { updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
