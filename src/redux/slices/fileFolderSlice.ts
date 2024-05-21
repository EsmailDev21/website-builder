// redux/slices/fileFolderSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Document, Folder } from "../../types";
import {
  createFolder,
  getChildFolders,
  getFoldersByProjectId,
} from "../../components/services/folderService";

export interface FileFoldersState {
  isLoading: boolean;
  currentFolder: Folder | null;
  userFolders: Folder[];
  userFiles: Document[];
  error: string | null;
}

const initialState: FileFoldersState = {
  isLoading: false,
  currentFolder: null,
  userFiles: [],
  userFolders: [],
  error: null,
};

export const fetchFoldersByProject = createAsyncThunk(
  "filefolders/fetchFoldersByProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const data = await getFoldersByProjectId(projectId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChildFolders = createAsyncThunk(
  "filefolders/fetchChildFolders",
  async (parentId: string, { rejectWithValue }) => {
    try {
      const data = await getChildFolders(parentId);
      return data.folders;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewFolder = createAsyncThunk(
  "filefolders/createNewFolder",
  async (
    folderData: Partial<
      Folder & {
        parent?: { connect?: { id?: string } };
        project?: { connect?: { id?: string } };
        path?: { set?: any[] };
      }
    >,
    { rejectWithValue }
  ) => {
    try {
      const data = await createFolder(folderData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fileFoldersSlice = createSlice({
  name: "filefolders",
  initialState,
  reducers: {
    changeFolder: (state, action) => {
      state.currentFolder =
        state.userFolders.find((folder) => folder.id === action.payload) ||
        null;
    },
    deleteFolderFromState: (state, action) => {
      state.userFolders = state.userFolders.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteFileFromState: (state, action) => {
      state.userFiles = state.userFiles.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoldersByProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoldersByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userFolders = action.payload;
        state.error = null;
      })
      .addCase(fetchFoldersByProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchChildFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChildFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userFolders = action.payload;
        state.error = null;
      })
      .addCase(fetchChildFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewFolder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userFolders.push(action.payload);
        state.error = null;
      })
      .addCase(createNewFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeFolder, deleteFileFromState, deleteFolderFromState } =
  fileFoldersSlice.actions;

export const getFileFoldersState = (state: RootState) => state.filefolders;

export default fileFoldersSlice.reducer;
