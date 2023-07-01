import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoggedIn: false,
    accessToken: "",
    refreshToken: "",
  },

  reducers: {
    setIsLoggedIn: (state, action) => void (state.isLoggedIn = action.payload),

    setAccessToken: (state, action) =>
      void (state.accessToken = action.payload),

    setRefreshToken: (state, action) =>
      void (state.refreshToken = action.payload),

    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setIsLoggedIn, setAccessToken, setRefreshToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
