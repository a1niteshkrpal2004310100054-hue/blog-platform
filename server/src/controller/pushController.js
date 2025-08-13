import webpush from "web-push";
import { Subscription } from "../model/subscriptionModel.js";
import dotenv from "dotenv";

dotenv.config();

webpush.setVapidDetails(
  "mailto:a1niteshkrpal2004310100054@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

//Save Subscription
export const subscribe = async (req, res) => {
  const { subscription, userId } = req.body;
  const { endpoint, keys } = subscription;
  try {
    const exist = await Subscription.findOne({ endpoint });
    if (!exist) {
      const subcscription = new Subscription({ user: userId, endpoint, keys });
      await subcscription.save();
    }

    return res.status(200).json({ message: "Subscribed Successfully" });
  } catch (error) {
    console.error("Subscription error", error);
    return res.status(500).json({ message: "Subscription failed" });
  }
};

export const sendPushNotification = async (userId, payload) => {
  // console.log("push notification", userId, payload);
  const subscription = await Subscription.find({ user: userId });

  if (!subscription) {
    return res.json("No subscription found for user", userId);
  }

  console.log(subscription);
  for (const subs of subscription) {
    const pushSubscription = {
      endpoint: subs.endpoint,
      keys: subs.keys,
    };

    console.log("pushSubscription", pushSubscription);

    try {
      await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
      console.log("push notification send to user", subs.endpoint);
    } catch (error) {
      console.error(error);
      if (error.statusCode == 410 || error.statusCode == 404) {
        await Subscription.delete({ _id: subs._id });
        console.log("delete expired push masssages");
      }
    }
  }
};
