import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from '@/types'


interface AuthState {
  userInfo: UserInfo | null;
}
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
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
  },
});

export const { setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
