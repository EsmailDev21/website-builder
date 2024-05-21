import { configureStore } from "@reduxjs/toolkit";
import selectedComponentReducer from "./slices/selectedComponent";
import userReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";
import foldersReducer from "./slices/foldersSlice";
import fileFoldersReducer from "./slices/fileFolderSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedFileFolderReducer = persistReducer(
  persistConfig,
  fileFoldersReducer
);

export const store = configureStore({
  reducer: {
    selectedComponent: selectedComponentReducer,
    user: userReducer,
    projects: projectsReducer,
    folders: foldersReducer,
    filefolders: persistedFileFolderReducer,
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
