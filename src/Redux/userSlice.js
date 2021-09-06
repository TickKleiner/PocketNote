import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSigned: false,
    isSignedGoogle: false,
    currentUser: null,
  },
  reducers: {
    signedWithGoogle: (state) => {
      state.isSigned = true;
      state.isSignedGoogle = true;
    },
    signedOutGoogle: (state) => {
      state.isSigned = false;
      state.isSignedGoogle = false;
    },
    setCurentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { signedWithGoogle, signedOutGoogle, setCurentUser } = userSlice.actions;

export default userSlice.reducer;