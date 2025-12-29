import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  dateStart: "",
  dateEnd: "",
}

export const bookRentRangeSlice = createSlice({
  name: "bookRentRange",
  initialState,
  reducers: {
    updateDateStart: (state, action: PayloadAction<string>) => {
      state.dateStart = action.payload;
    },
    updateDateEnd: (state, action: PayloadAction<string>) => {
      state.dateEnd = action.payload;
    },
  }
});

export const { updateDateStart, updateDateEnd } = bookRentRangeSlice.actions;
export default bookRentRangeSlice.reducer;