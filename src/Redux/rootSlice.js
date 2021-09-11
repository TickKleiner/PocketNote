import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    busy: false,
    online: true,
    lastScreenName: "",
  },
  reducers: {
    toggleBusy: (state, action) => {
      state.busy = action.payload;
    },
    toggleOnline: (state, action) => {
      state.online = action.payload;
    },
    setLastScreenName: (state, action) => {
      state.lastScreenName = action.payload;
    }
  }
});

export const { toggleBusy, toggleOnline, setLastScreenName } = rootSlice.actions;

export default rootSlice.reducer;