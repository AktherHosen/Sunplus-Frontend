// src/redux/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { baseApi } from "./api/baseApi";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  // auth: authReducer, // ✅ add this if you have an auth slice
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ persist only auth slice, not API cache
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 important for redux-persist
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
