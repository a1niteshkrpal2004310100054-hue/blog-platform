import { createSlice } from "@reduxjs/toolkit";

interface LikeState {
  isLiked: boolean;
  totalLikes: number | null;
}

const initialState: LikeState = {
  isLiked: false,
  totalLikes: null,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addLike: (state) => {
      state.isLiked = true;
    },

    removeLike: (state) => {
      state.isLiked = false;
    },
  },
});

export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
