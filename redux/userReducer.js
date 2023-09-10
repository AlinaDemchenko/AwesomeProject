import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    changeAvatar: (state, action) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
    setUserLogin: (state, action) => {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
  },
});

export const { signIn, changeAvatar, setUserLogin, removeAvatar, signOut, setUserToken} =
  userSlice.actions;
export const userReducer = userSlice.reducer;
