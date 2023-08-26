import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (bulid) => ({
    getArticlesList: bulid.query({
      query: (skipArticle = 0) => `/articles?offset=${skipArticle}`,
    }),
    getArticle: bulid.query({
      query: (slug) => `/articles/${slug}`,
    }),
    postUsers: bulid.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    postUsersLogin: bulid.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      transformResponse: ({ user }) => {
        return {
          username: user.username,
          email: user.email,
          jwt: user.token,
        };
      },
    }),
    getUsersAuth: bulid.query({
      query: (jwt) => ({
        url: `/user`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),
    putUsersEdit: bulid.mutation({
      query: (prop) => ({
        url: '/user',
        headers: {
          Authorization: `Bearer ${prop.userToken}`,
          'content-type': 'application/json',
        },
        method: 'PUT',
        body: prop.user,
      }),
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetArticleQuery,
  usePostUsersMutation,
  usePostUsersLoginMutation,
  useGetUsersAuthQuery,
  usePutUsersEditMutation,
} = blogApi;
