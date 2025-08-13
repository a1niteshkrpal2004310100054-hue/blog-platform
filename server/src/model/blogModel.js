import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    blogType: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    content: {
      type: Object,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
