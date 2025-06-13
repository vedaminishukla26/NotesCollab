import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    console.error("Could not load user from localStorage", err);
    return null;
  }
};

const initialUser = loadUserFromStorage()

const initialState = {
    user: initialUser,
    token: initialToken,
    isAuth: !!initialToken && !!initialUser,
    error: null,
    authModalOpen: false
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess(state, action) {
        state.user  = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
        state.error = null;
      },
      logout(state) {
        return initialState;
      },
      openAuthModal:  (state) => { state.authModalOpen = true; },
      closeAuthModal: (state) => { state.authModalOpen = false; },
      authError(state, action) {
        state.error  = action.payload;          
        state.token  = null;                    
        state.isAuth = false;
        state.user = null
      },
    },
  });
  
  export const { loginSuccess, logout, openAuthModal, closeAuthModal, authError } = authSlice.actions;
  export default authSlice.reducer;