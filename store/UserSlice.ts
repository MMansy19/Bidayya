import { createSlice } from '@reduxjs/toolkit';

const initialUser = localStorage.getItem('bidayyauser')
  ? JSON.parse(localStorage.getItem('bidayyauser') as string)
  : null;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('bidayyauser', JSON.stringify(action.payload.user));
      window.location.href = '/';
    },
    signIn: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('bidayyauser', JSON.stringify(action.payload.user));
      if (
        window.location.pathname === '/signin' ||
        window.location.pathname === '/signup' ||
        window.location.pathname === '/forgot-password'
      )
        window.location.href = '/';
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('bidayyauser');
      if (
        window.location.pathname !== '/signin' &&
        window.location.pathname !== '/forgot-password' &&
        window.location.pathname !== '/signup'
      )
        window.location.href = '/signin';
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('bidayyauser', JSON.stringify(action.payload.user));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('bidayyauser');
    },
    changeEmail: (state, action) => {
      state.user.email = action.payload.email;
      localStorage.setItem('bidayyauser', JSON.stringify(action.payload.user));
    },
  },
});

export const { signUp, signIn, signOut, setUser, clearUser, changeEmail } =
  userSlice.actions;
export default userSlice.reducer;
