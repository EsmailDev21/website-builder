import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SelectedComponentState {
  selected: Node | null;
}

const initialState: SelectedComponentState = {
  selected: null,
};

export const selectedComponentSlice = createSlice({
  name: "selectedComponent",
  initialState,
  reducers: {
    select: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select } = selectedComponentSlice.actions;

export const getSelectedComponent = (state: RootState) =>
  state.selectedComponent.selected;
const selectedComponentReducer = selectedComponentSlice.reducer;
export default selectedComponentReducer;
