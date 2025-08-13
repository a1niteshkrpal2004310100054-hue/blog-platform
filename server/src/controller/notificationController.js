import { Notification } from "../model/notificationModel.js";
// import { User } from "../model/userModel";
// import { Blog } from "../model/blogModel";

export const getNotification = async (req, res) => {
  const userId = req.user.userId;
  try {
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized User" });
    }

    const notify = await Notification.find({ recipent: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "username avatar");

    return res.status(200).json(notify);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const deleteNotification = async (req, res) => {
  const navId = req.params.id;
  const userId = req.user.userId;

  console.log("nav and userId", navId, userId);
  try {
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized User" });
    }

    const notify = await Notification.findByIdAndDelete(navId);

    return res.status(200).json({ message: "notification deleted" }, notify);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const markAllAsRead = async (req, res) => {
  const userId = req.user.userId;
  try {
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized User" });
    }

    await Notification.updateMany(
      { recipent: userId, isRead: false },
      { isRead: true }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
