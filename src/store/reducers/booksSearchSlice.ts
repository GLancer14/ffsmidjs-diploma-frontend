import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: number;
  libraryId: number;
  title: string;
  author: string;
  coverImage?: string;
  year?: number;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
}

const initialState: Book[] = [
  // {
  //   id: 0,
  //   libraryId: 0,
  //   title: "",
  //   author: "",
  //   coverImage: "",
  //   year: 0,
  //   description: "",
  //   totalCopies: 0,
  //   availableCopies: 0,
  // }
]

export const booksSearchSlice = createSlice({
  name: "booksSearch",
  initialState,
  reducers: {
    updateFoundBooks: (state, action: PayloadAction<Book[]>) => {
      return action.payload;
    },
    // updateFoundBookForRent: (state, action: PayloadAction<Book>) => {
    //   state = [action.payload];
    // }
  }
});

export const { updateFoundBooks } = booksSearchSlice.actions;
export default booksSearchSlice.reducer;