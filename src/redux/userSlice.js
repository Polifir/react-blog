import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: '',
  auth: false,
  user: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logOut: (state, actions) => {
      state.jwt = '';
      state.auth = false;
      state.user = {};
      localStorage.removeItem(actions.payload);
      document.cookie = `Token=`;
    },
    signIn: (state, actions) => {
      document.cookie = `Token=${actions.payload.jwt}`;
      state.jwt = actions.payload.jwt;
      state.auth = true;
      state.user = {
        username: actions.payload.username,
        email: actions.payload.email,
      };
      localStorage.setItem(
        `${actions.payload.jwt}`,
        JSON.stringify({
          username: actions.payload.username,
          email: actions.payload.email,
        })
      );
    },
    auth: (state, actions) => {
      console.log(actions.payload);
      const user = JSON.parse(localStorage.getItem(actions.payload));
      console.log(user);
      state.user = user;
    },
    updateUser: (state, actions) => {
      console.log(actions.payload);
    },
  },
});
export const { logOut, signIn, auth, updateUser } = userSlice.actions;

export default userSlice.reducer;
