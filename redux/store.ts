import { configureStore } from '@reduxjs/toolkit';
import { drawingApiSlice } from './drawingApiSlice';

export const store = configureStore({
  reducer: {
    [drawingApiSlice.reducerPath]: drawingApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(drawingApiSlice.middleware),
});