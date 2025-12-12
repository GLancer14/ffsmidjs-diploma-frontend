import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./reducers/userSlice";

export const setupStore = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;