import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./reducers/userSlice";
import booksSearchReducer from "./reducers/booksSearchSlice";

export const setupStore = configureStore({
  reducer: {
    usersReducer,
    booksSearchReducer,
  },
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;