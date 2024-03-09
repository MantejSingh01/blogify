import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:3006'; 

const prepareHeaders = (headers, { getState }) => {
  const { user } = getState();
console.log( user?.user?.data?.authToken,"------")
  const token = user?.user?.data?.authToken;
  if (token) {
    headers.set('Authorization', `${token}`);
  }
  return headers;
};

export const blogPosts = createApi({
  reducerPath: 'blogPosts',
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getBlogPosts: builder.mutation({
      query: (body) => ({
        url: 'user/getAllBlogs',
        method: 'POST',
        body: body,
      }),
      providesTags: ['Post'],
    }),
    createNewPost: builder.mutation({
      query: (body) => ({
        url: 'user/addBlog',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `user/updateBlog`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Post'],
    })
  }),
});



export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    allBlogs: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllBlogsSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload,"pay====")
      state.allBlogs = action.payload;
    },
    getAllBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllBlogsStart,
  getAllBlogsSuccess,
  getAllBlogsFailure,
} = blogSlice.actions;

export const { useGetBlogPostsMutation, useCreateNewPostMutation, useUpdatePostMutation, useDeletePostMutation } = blogPosts;

export default blogSlice.reducer;
