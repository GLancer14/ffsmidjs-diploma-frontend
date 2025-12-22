import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: number;
  name: string;
  email: string;
  contactPhone: string;
  role?: string;
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  contactPhone: "",
  role: ""
};

export const observedUserProfileSlice = createSlice({
  name: "observedUserProfile",
  initialState,
  reducers: {
    updateObservedUserProfile: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    resetObservedUserProfile: () => {
      return initialState;
    }
    
  }
});

export const { updateObservedUserProfile, resetObservedUserProfile } = observedUserProfileSlice.actions;
export default observedUserProfileSlice.reducer;
