import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice.js'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer) 

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)