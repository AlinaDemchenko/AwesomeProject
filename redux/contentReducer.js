import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from '@reduxjs/toolkit';

const initialState = {
posts: []
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
      addPost:
      //  { reducer: 
        (state, action) => {
          if(action.payload)
          {state.posts = action.payload}
        },
        // prepare: postData => {
        //   return { payload: { id: nanoid(), ...postData } };
        // }, },
        clearPosts: (state) => {state.posts = []},
    },
  })

export const { addPost, clearPosts } = contentSlice.actions;
export const contentReducer = contentSlice.reducer;