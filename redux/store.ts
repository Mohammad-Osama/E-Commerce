import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import cartReducer from "./slices/cartSlice"
import authReducer from './slices/authSlice'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key :any) {
      return Promise.resolve(null);
    },
    setItem(_key:any, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();
const persistConfig = {
  key: 'root',
  storage,
}


const reducers = combineReducers({
  cart : cartReducer,  
  auth : authReducer ,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store