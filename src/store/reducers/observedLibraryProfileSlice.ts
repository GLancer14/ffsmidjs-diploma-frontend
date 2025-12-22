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

export interface BookDataForLibrary {
  totalCopies: number;
  availableCopies: number;
  book: {
    id: number;
    title: string;
    author: string;
    year: number;
    description: string;
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
  }
});

export const {
  updateObservedLibraryProfile,
  resetObservedLibraryProfile,
  updateLibraryInfo
} = observedLibraryProfileSlice.actions;
export default observedLibraryProfileSlice.reducer;
