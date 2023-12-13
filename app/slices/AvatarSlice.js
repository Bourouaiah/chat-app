import { createSlice } from "@reduxjs/toolkit";

import avatarImg from '../../assets/avatar-23.png'

const initialState = {
  userName: '',
  userEmail: '',
  userPassword: '',
  avatarPic: avatarImg,
};

export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    selectNewAvatar: (state, action) => {
      state.avatarPic = action.payload;
    },
    getTheUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPassword = action.payload.userPassword;
      state.avatarPic = action.payload.avatarPic;
    }
  },
});

export const { setNewUser, selectNewAvatar, getTheUser } = avatarSlice.actions;

export default avatarSlice.reducer;
