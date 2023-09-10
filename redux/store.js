import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST, 
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contentReducer } from "./contentReducer";
import { userReducer } from "./userReducer";

const userPersistConfig = {
  key: "authentication",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    authentication: persistReducer(userPersistConfig, userReducer),
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
