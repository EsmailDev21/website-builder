import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Project } from "../../types";

export interface ProjectsState {
  data: Project[];
  loading: boolean;
  error: string;
}

const initialState: ProjectsState = {
  data: [],
  error: "",
  loading: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
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
export const { endtLoading, setError, setProjects, startLoading } =
  projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;
const projectsReducer = projectsSlice.reducer;
export default projectsReducer;
