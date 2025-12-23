import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateLibraryParams, UpdateLibraryParams } from "../../api/libraries";

export interface LibraryState {
  id: number;
  name: string;
  address: string;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  book: BookDataForLibrary[];
}

// export interface Book {
//     id: number;
//     title: string;
//     author: string;
//     year?: number;
//     description?: string;
//   }

export interface BookDataForLibrary {
  totalCopies: number;
  availableCopies: number;
  book: {
    id: number;
    title: string;
    author: string;
    year: number;
    description: string;
    coverImage: string | null,
  }
}

const initialState: LibraryState = {
  id: 0,
  name: "",
  address: "",
  description: "",
  totalCopies: 0,
  availableCopies: 0,
  book: [{
    totalCopies: 0,
    availableCopies: 0,
    book: {
      id: 0,
      title: "",
      author: "",
      year: 0,
      description: "",
      coverImage: null,
    }
  }]
};

export const observedLibraryProfileSlice = createSlice({
  name: "observedLibraryProfile",
  initialState,
  reducers: {
    updateObservedLibraryProfile: (state, action: PayloadAction<LibraryState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    resetObservedLibraryProfile: () => {
      return initialState;
    },
    updateLibraryInfo: (state, action: PayloadAction<CreateLibraryParams>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateLibraryBook: (state, action: PayloadAction<BookDataForLibrary>) => {
      const editedBook = state.book.findIndex(book => {
        return book.book.id === action.payload.book.id;
      });

      if (editedBook !== -1) {
        state.book[editedBook] = action.payload;
        state.availableCopies = state.book.reduce((acc, curr) => acc + curr.availableCopies, 0);
        state.totalCopies = state.book.reduce((acc, curr) => acc + curr.totalCopies, 0);
      }
    },
    addBookToLibrary: (state, action: PayloadAction<BookDataForLibrary>) => {
      state.book.push(action.payload);
      state.availableCopies = state.book.reduce((acc, curr) => acc + curr.availableCopies, 0);
      state.totalCopies = state.book.reduce((acc, curr) => acc + curr.totalCopies, 0);
    },
    deleteBookFromLibrary: (state, action: PayloadAction<{bookId: number}>) => {
      state.book = state.book.filter(book => book.book.id !== action.payload.bookId);
      state.availableCopies = state.book.reduce((acc, curr) => acc + curr.availableCopies, 0);
      state.totalCopies = state.book.reduce((acc, curr) => acc + curr.totalCopies, 0);
    },
  }
});

export const {
  updateObservedLibraryProfile,
  resetObservedLibraryProfile,
  updateLibraryInfo,
  addBookToLibrary,
  updateLibraryBook,
  deleteBookFromLibrary,
} = observedLibraryProfileSlice.actions;
export default observedLibraryProfileSlice.reducer;
