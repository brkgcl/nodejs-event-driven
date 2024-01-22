import { createSlice } from '@reduxjs/toolkit';

const authInıtıalState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInıtıalState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    loqOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, loqOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
