import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Urls {
  item: string;
}
interface blogState {
  uploadedImages: Urls[];
}

const initialState: blogState = {
  uploadedImages: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addUploadImage: (state, action: PayloadAction<Urls>) => {
      if (!state.uploadedImages.includes(action.payload)) {
        state.uploadedImages.push(action.payload);
      }
    },

    deleteUploads: (state, action: PayloadAction<Urls>) => {
      state.uploadedImages = state.uploadedImages.filter(
        (url) => url !== action.payload
      );
    },

    clearUploads: (state) => {
      state.uploadedImages = [];
    },
  },
});

export const { addUploadImage, deleteUploads, clearUploads } =
  blogSlice.actions;
export default blogSlice.reducer;
