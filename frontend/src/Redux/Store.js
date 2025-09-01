import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import userReducer from "../features/userSlice.js"
import { configureStore } from "@reduxjs/toolkit"

// Combine all reducers into one root reducer
// If more reducers are added later
// (e.g., postsReducer, cartReducer), they can be included here
const rootReducer = combineReducers({
  user: userReducer,
})

// Configuration object for redux-persist
// key: 'root' = name of the persisted state in storage
// storage => defines where to store the data (localStorage in this case)
const persistConfig = {
  key: 'root',
  storage,
}

// Wrap rootReducer with persistReducer
// so that Redux state is saved and rehydrated from storage
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  // Disable serializableCheck warning
  // since redux-persist stores non-serializable values like promises
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false})
})

// Create persistor which will be used by PersistGate in React to persist/rehydrate state
export const persistor = persistStore(store)
