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
  author: number;
  sentAt: string;
  text: string;
  readAt: string | null;
  supportRequestId: number;
  users: {
    name: string;
  }
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
      author: 0,
      sentAt: "",
      text: "",
      readAt: null,
      supportRequestId: 0,
      users: {
        name: "",
      }
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
    },
    readMessage: (state, action: PayloadAction<number>) => {
      const currentDate = new Date();
      state.chat.messages = state.chat.messages.map(message => {
        if (message.id === action.payload) {
          return {
            ...message,
            readAt: currentDate.toISOString(),
          };
        }

        return message;
      })
    },
  }
});

export const {
  updateObservedUserProfile,
  resetObservedUserProfile,
  updateObservedUserChat,
  addMessage,
  readMessage,
} = observedUserProfileSlice.actions;
export default observedUserProfileSlice.reducer;
