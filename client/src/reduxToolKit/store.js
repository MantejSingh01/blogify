import { configureStore } from '@reduxjs/toolkit'
import blogReducer, { blogPosts }from './BlogSlice'
import userReducer, {userApi} from './UserSlice'

export const store = configureStore({
  reducer: {
    [blogPosts.reducerPath]:blogPosts.reducer,
    [userApi.reducerPath]:userApi.reducer,
    user:userReducer,
    blog:blogReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogPosts.middleware).concat(userApi.middleware),
})

