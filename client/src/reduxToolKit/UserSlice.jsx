import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';


const baseUrl = 'http://localhost:3006'; 
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'user/forgotPassword',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'user/resetPassword',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
});


export const userSlice = createSlice({
    name: 'user',
    initialState: { user: null,
        isLoggedIn: false},
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      },
      clearUser: (state) => {
        state.user = null;
        state.isLoggedIn = false;
      },
    },
  });
  

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;