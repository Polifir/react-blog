import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: '',
  user: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logOut: (state, actions) => {
      state.jwt = '';
      state.user = {};
      localStorage.removeItem(actions.payload);
      document.cookie = `Token=`;
    },
    signIn: (state, actions) => {
      document.cookie = `Token=${actions.payload.jwt}`;
      state.jwt = actions.payload.jwt;
      state.user = {
        username: actions.payload.username,
        email: actions.payload.email,
        image: actions.payload.image,
      };

      localStorage.setItem(
        `${actions.payload.jwt}`,
        JSON.stringify({
          username: actions.payload.username,
          email: actions.payload.email,
          image: actions.payload.image,
        })
      );
    },
    auth: (state, actions) => {
      const user = JSON.parse(localStorage.getItem(actions.payload));
      state.user = user;
      state.jwt = actions.payload;
    },
    updateUser: (state, actions) => {
      document.cookie = `Token=${actions.payload.userToken}`;
      state.jwt = actions.payload.userToken;
      state.user = {
        username: actions.payload.user.username,
        email: actions.payload.user.email,
        image: actions.payload.user.image,
      };
      localStorage.setItem(
        `${actions.payload.userToken}`,
        JSON.stringify({
          username: actions.payload.user.username,
          email: actions.payload.user.email,
          image: actions.payload.image,
        })
      );
    },
  },
});
export const { logOut, signIn, auth, updateUser } = userSlice.actions;

export default userSlice.reducer;
