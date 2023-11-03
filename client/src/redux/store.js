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


/*

import { persistReducer } from 'redux-persist' - This line imports the persistReducer function from redux-persist. This function is used to create a new reducer that will automatically store any state changes in local storage.

import storage from 'redux-persist/lib/storage'; - This line imports the default storage engine. In a web environment, this will be local storage.

const persistConfig = { key: 'root', version: 1, storage } - This is the configuration object for redux-persist. The key is the key used for storing the state in local storage. The version is the version of the reducer. The storage is the storage engine to use.

const persistedReducer = persistReducer(persistConfig, rootReducer) - This line creates a new reducer that will automatically store any state changes in local storage. It takes the configuration object and the root reducer as arguments.

export const store = configureStore({ reducer: persistedReducer, ... }) - This line creates the Redux store using the persisted reducer. Any changes to the state will now be automatically saved in local storage.

export const persistor = persistStore(store) - This line creates a persistor for the store. This persistor will be used in the PersistGate component to delay the rendering of the app’s UI until the state has been retrieved from local storage.
in main.js
<PersistGate persistor={persistor} loading={null}> - This is a React component provided by redux-persist. It delays the rendering of the app’s UI until the state has been retrieved from local storage. The persistor prop is the persistor created earlier. The loading prop is a component that will be rendered while the state is being retrieved from local storage.
*/