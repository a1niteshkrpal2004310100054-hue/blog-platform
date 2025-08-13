import mongoose, { Schema } from "mongoose";

const userNotification = new Schema(
  {
    recipent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow"],
      require: true,
    },
    targetBlog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      default: null,
    },
    targetUser: { type: Schema.Types.ObjectId, ref: "User", default: null },
    message: { type: String },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", userNotification);
