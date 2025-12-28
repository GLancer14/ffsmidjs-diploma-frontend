import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userSlice";
import booksSearchReducer from "./reducers/booksSearchSlice";
import observedUserProfileReducer from "./reducers/observedUserProfileSlice";
import observedLibraryProfileReducer from "./reducers/observedLibraryProfileSlice";

export const setupStore = configureStore({
  reducer: {
    userReducer,
    booksSearchReducer,
    observedUserProfileReducer,
    observedLibraryProfileReducer,
  },
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;