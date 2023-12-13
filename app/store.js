import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from './slices/AvatarSlice';

export const store = configureStore({
  reducer: {
    avatar: avatarReducer
  },
});
