import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface IInitialState { token: string | null }

const initialState: IInitialState = { token: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => { state.token = payload },
    logout: (state) => { state.token = null }
  }
})

export const authReducer = authSlice.reducer
export const { setAccessToken, logout } = authSlice.actions
export const selectToken = (state: RootState) => state.auth.token
