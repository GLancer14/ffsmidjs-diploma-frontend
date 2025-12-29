import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userSlice";
import booksSearchReducer from "./reducers/booksSearchSlice";
import observedUserProfileReducer from "./reducers/observedUserProfileSlice";
import observedLibraryProfileReducer from "./reducers/observedLibraryProfileSlice";
import bookRentRangeSlice from "./reducers/bookRentRangeSlice";

export const setupStore = configureStore({
  reducer: {
    userReducer,
    booksSearchReducer,
    observedUserProfileReducer,
    observedLibraryProfileReducer,
    bookRentRangeSlice,
  },
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;