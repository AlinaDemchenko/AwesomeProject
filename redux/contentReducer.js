import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
posts: []
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
      addPost:
       { reducer: 
        (state, action) => {state.posts.push(action.payload)},
        prepare: postData => {
          return { payload: { id: nanoid(), ...postData } };
        }, },
        clearPosts: (state) => {state.posts = []},
        getPosts: (state, action) => {
          state.posts = action.payload
        },
    },
  })

export const { addPost, clearPosts, getPosts } = contentSlice.actions;
export const contentReducer = contentSlice.reducer;