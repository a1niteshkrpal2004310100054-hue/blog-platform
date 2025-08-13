import webpush from "web-push";
import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    endpoint: {
      type: String,
      require: true,
      unique: true,
    },
    keys: {
      auth: {
        type: String,
        require: true,
      },
      p256dh: {
        type: String,
        require: true,
      },
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
