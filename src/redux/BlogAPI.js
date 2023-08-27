import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Articles', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (bulid) => ({
    getArticlesList: bulid.query({
      query: (prop) => ({
        url: `/articles?offset=${prop.artcileSkip}`,

        headers: {
          Authorization: `Bearer ${prop.userToken}`,
        },
      }),
      providesTags: ['Articles'],
    }),
    getArticle: bulid.query({
      query: (slug) => `/articles/${slug}`,
    }),
    postAticle: bulid.mutation({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${body.userToken}`,
        },
        body: { article: body.article },
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: bulid.mutation({
      query: (body) => ({
        url: `/articles/${body.slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    putArticleEdit: bulid.mutation({
      query: (prop) => ({
        url: `/articles/${prop.slug}`,
        headers: {
          Authorization: `Bearer ${prop.userToken}`,
          'content-type': 'application/json',
        },
        method: 'PUT',
        body: { article: prop.data },
      }),
      invalidatesTags: ['Articles'],
    }),
    postArticleFavorited: bulid.mutation({
      query: (prop) => ({
        url: `/articles/${prop.slug}/favorite`,
        headers: {
          Authorization: `Bearer ${prop.token}`,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Articles'],
    }),
    postArticleUnFavorited: bulid.mutation({
      query: (prop) => ({
        url: `/articles/${prop.slug}/favorite`,
        headers: {
          Authorization: `Bearer ${prop.token}`,
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
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
          image: user.image,
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
        body: { user: prop.user },
      }),
    }),
  }),
});

export const {
  useGetArticlesListQuery,
  useGetArticleQuery,
  usePostUsersMutation,
  usePostUsersLoginMutation,
  usePostArticleFavoritedMutation,
  usePostArticleUnFavoritedMutation,
  useGetUsersAuthQuery,
  usePutUsersEditMutation,
  usePostAticleMutation,
  useDeleteArticleMutation,
  usePutArticleEditMutation,
} = blogApi;
