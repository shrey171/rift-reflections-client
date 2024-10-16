import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface IInitialState {
  isLoading: boolean;
}

const initialState: IInitialState = {
  isLoading: false
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSpinnerState: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading || false;
    }
  }
})

export const globalReducer = globalSlice.reducer
export const { setSpinnerState } = globalSlice.actions
export const selectIsLoading = (state: RootState) => state.global.isLoading