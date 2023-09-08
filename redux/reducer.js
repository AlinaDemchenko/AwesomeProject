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
        (state, action) => {
          console.log(action.payload);
          console.log(state.posts);
          state.posts.push(action.payload)
        },
        prepare: postData => {
          return { payload: { id: nanoid(), ...postData } };
        }, },
    },
  })

export const { addPost } = contentSlice.actions;
export const contentReducer = contentSlice.reducer;