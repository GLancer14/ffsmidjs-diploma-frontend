import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  contactPhone: string;
  role: string;}

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
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
});

export default usersSlice.reducer;