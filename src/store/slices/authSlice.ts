import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, DarkMode } from "@/types";

interface AuthState {
  userInfo: UserInfo | null;
  darkMode: DarkMode;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
  darkMode: (localStorage.getItem("darkMode") as DarkMode) || "system",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    toggleDarkMode: (state, action: PayloadAction<DarkMode>) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { setUserInfo, logout, toggleDarkMode } = authSlice.actions;

export default authSlice.reducer;
