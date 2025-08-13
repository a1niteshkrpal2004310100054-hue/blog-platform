import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CommentData } from "@/type/blogType";

interface CommnetState {
  comments: CommentData[];
}

const initialState: CommnetState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComments: (state, action: PayloadAction<CommentData[]>) => {
      state.comments = action.payload;
    },
    addComments: (state, action: PayloadAction<CommentData>) => {
      state.comments.unshift(action.payload);
    },
    deleteCommets: () => {},
  },
});

export const { addComments, getComments, deleteCommets } = commentSlice.actions;

export default commentSlice.reducer;
