import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import rootReducer from './rootSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    root: rootReducer
  }
})