import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../types/library";

export interface BookRentalResponseDto {
  id: number;
  userId: number;
  library: {
    name?: string;
    address?: string;
  };
  book: {
    title?: string;
    author?: string;
    coverImage?: string;
  };
  dateStart: string;
  dateEnd: string;
  status: string;
}

const initialState: Array<BookRentalResponseDto[]> = [];

export const usersRentsSlice = createSlice({
  name: "usersRents",
  initialState,
  reducers: {
    updateUsersRents: (state, action: PayloadAction<BookRentalResponseDto[][]>) => {
      return action.payload;
    },
  }
});

export const { updateUsersRents } = usersRentsSlice.actions;
export default usersRentsSlice.reducer;