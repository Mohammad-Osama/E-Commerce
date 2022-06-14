import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import cartReducer from "./slices/cartSlice"

const persistConfig = {
  key: 'root',
  storage,
}


const reducers = combineReducers({
  cart: cartReducer,  // to be written 

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