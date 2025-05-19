import type { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";


export type TUser = {
  email: string;
  password: string;
 
};

export type TAuthState = {
  user: null | TUser;
  token: null | object;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      localStorage.setItem("accessToken" , "")
      window.location.reload()
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
