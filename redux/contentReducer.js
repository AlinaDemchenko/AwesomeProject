import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [
  ],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (postData) => {
        return { payload: { id: nanoid(), ...postData } };
      },
    },
    clearPosts: (state) => {
      state.posts = [];
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addComment: 
    {
      reducer: (state, action) => {
        state.comments.push(action.payload);
      },
      prepare: (postData) => {
        return { payload: { id: nanoid(), ...postData } };
      },
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
  },
}});

export const { addPost, clearPosts, setPosts, addComment, setComments, clearComments } =
  contentSlice.actions;
export const contentReducer = contentSlice.reducer;
