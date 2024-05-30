import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Document, Folder } from "../../types";
import {
  createFolder,
  getChildFolders,
  getFoldersByProjectId,
} from "../../components/services/folderService";
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  CreateDocumentDto,
  UpdateDocumentDto,
} from "../../components/services/documentService"; // Import document services

// Redux state interface
export interface FileFoldersState {
  isLoading: boolean;
  currentFolder: Folder | null;
  userFolders: Folder[];
  userFiles: Document[];
  error: string | null;
}

// Initial state
const initialState: FileFoldersState = {
  isLoading: false,
  currentFolder: null,
  userFiles: [],
  userFolders: [],
  error: null,
};

// Thunks for folder-related operations
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

// Thunks for document-related operations
export const fetchAllDocuments = createAsyncThunk(
  "filefolders/fetchAllDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllDocuments();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  "filefolders/fetchDocumentById",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const data = await getDocumentById(documentId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewDocument = createAsyncThunk(
  "filefolders/createNewDocument",
  async (
    documentData: {
      dto: CreateDocumentDto;
      projectId: string;
      fileName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await createDocument(
        documentData.dto,
        documentData.projectId,
        documentData.fileName
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingDocument = createAsyncThunk(
  "filefolders/updateExistingDocument",
  async (
    {
      documentId,
      documentData,
    }: { documentId: string; documentData: UpdateDocumentDto },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateDocument(documentId, documentData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDocumentById = createAsyncThunk(
  "filefolders/deleteDocumentById",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await deleteDocument(documentId);
      return documentId; // Return documentId on success for removing from state
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice
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
      // Folder-related reducers
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
      })
      // Document-related reducers
      .addCase(fetchAllDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userFiles = action.payload;
        state.error = null;
      })
      .addCase(fetchAllDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Document-related reducers
      .addCase(fetchDocumentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming fetched document should be added to userFiles
        state.userFiles.push(action.payload);
        state.error = null;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming created document should be added to userFiles
        state.userFiles.push(action.payload);
        state.error = null;
      })
      .addCase(createNewDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExistingDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming updated document should be updated in userFiles
        state.userFiles = state.userFiles.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        );
        state.error = null;
      })
      .addCase(updateExistingDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDocumentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDocumentById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming deleted document should be removed from userFiles
        state.userFiles = state.userFiles.filter(
          (doc) => doc.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteDocumentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add similar reducers for other document actions
  },
});

export const { changeFolder, deleteFileFromState, deleteFolderFromState } =
  fileFoldersSlice.actions;

export const getFileFoldersState = (state: RootState) => state.filefolders;

export default fileFoldersSlice.reducer;
