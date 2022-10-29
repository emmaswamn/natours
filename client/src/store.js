import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import tourSlice from './features/tours/tourSlice';
import authSlice from './features/auth/authSlice';
import alertSlice from './features/alert/alertSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    tour: tourSlice,
    auth: authSlice,
    alert: alertSlice
  },
});