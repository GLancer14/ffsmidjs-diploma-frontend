import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../types/library";

const initialState: Book[] = []

export const booksSearchSlice = createSlice({
  name: "booksSearch",
  initialState,
  reducers: {
    updateFoundBooks: (state, action: PayloadAction<Book[]>) => {
      return action.payload;
    },
  }
});

export const { updateFoundBooks } = booksSearchSlice.actions;
export default booksSearchSlice.reducer;