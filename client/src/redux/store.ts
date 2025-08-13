import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import likeReducer from "./likeSlice";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";
import commentReducer from "./commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    like: likeReducer,
    comment: commentReducer,
    notify: notifyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
