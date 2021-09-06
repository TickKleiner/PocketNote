import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    busy: false,
    online: true
  },
  reducers: {
    toggleBusy: (state, action) => {
      state.busy = action.payload;
    },
    toggleOnline: (state, action) => {
      state.online = action.payload;
    }
  }
});

export const { toggleBusy, toggleOnline } = rootSlice.actions;

export default rootSlice.reducer;