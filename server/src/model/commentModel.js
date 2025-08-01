import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAtAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
