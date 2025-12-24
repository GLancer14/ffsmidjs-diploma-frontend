import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: number;
  name: string;
  email: string;
  contactPhone: string;
  role?: string;
  chat: Chat;
}

export interface ProfileData {
  id?: number;
  name: string;
  email: string;
  contactPhone: string;
  role?: string;
} 

export interface Message {
  id: number;
  author: string;
  sentAt: string;
  text: string;
  readAt: string | null;
  supportRequestId: number;
}

export interface Chat {
  id: number;
  user: number;
  createdAt: string;
  messages: Message[];
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  contactPhone: "",
  role: "",
  chat: {
    id: 0,
    user: 0,
    createdAt: "",
    messages: [{
      id: 0,
      author: "",
      sentAt: "",
      text: "",
      readAt: null,
      supportRequestId: 0,
    }]
  }
};

export const observedUserProfileSlice = createSlice({
  name: "observedUserProfile",
  initialState,
  reducers: {
    updateObservedUserProfile: (state, action: PayloadAction<ProfileData>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateObservedUserChat: (state, action: PayloadAction<Chat>) => {
      state.chat = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.chat.messages.push(action.payload);
    },
    resetObservedUserProfile: () => {
      return initialState;
    }
  }
});

export const {
  updateObservedUserProfile,
  resetObservedUserProfile,
  updateObservedUserChat,
  addMessage,
} = observedUserProfileSlice.actions;
export default observedUserProfileSlice.reducer;
