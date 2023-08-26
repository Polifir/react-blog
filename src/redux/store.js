import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './BlogAPI';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});
