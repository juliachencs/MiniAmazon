import { api } from "@/app/api";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the type of 'store'
export type AppStore = typeof store;

// Infer the "AppDispatch" type from the store itself
export type AppDispatch = typeof store.dispatch;

// Same for the 'RootState' type
export type RootState = ReturnType<typeof store.getState>;
