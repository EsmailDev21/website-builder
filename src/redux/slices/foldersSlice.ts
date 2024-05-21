import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Folder, Project } from "../../types";

export interface FoldersState {
  data: Folder[];
  loading: boolean;
  error: string;
}

const initialState: FoldersState = {
  data: [],
  error: "",
  loading: false,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.data = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endtLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { endtLoading, setError, setFolders, startLoading } =
  foldersSlice.actions;

export const selectFolders = (state: RootState) => state.folders;
const foldersReducer = foldersSlice.reducer;
export default foldersReducer;
