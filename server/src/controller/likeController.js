import { Blog } from "../model/blogModel.js";
import { User } from "../model/userModel.js";
import { Notification } from "../model/notificationModel.js";
import { io } from "../../app.js";
import { getUserSocketId } from "../socket/socketServer.js";
import { sendPushNotification } from "./pushController.js";

// Like Post
export const likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.userId;
  try {
    const blog = await Blog.findById(blogId).populate("author", "username");
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    const isliked = blog.likes.includes(userId);
    if (isliked) {
      return req.json({ message: "Already liked" });
    } else {
      blog.likes.push(userId);
    }

    const user = await User.findById({ _id: userId }).select(
      "_id username avatar"
    );

    if (blog.author._id.toString() !== userId) {
      const createNotification = await Notification.create({
        recipent: blog.author,
        sender: user,
        type: "like",
        targetBlog: blog._id,
        message: `is liked your blog "${blog.title}"`,
      });

      const recipentSocketId = getUserSocketId(blog.author._id.toString());
      if (recipentSocketId) {
        await sendPushNotification(blog.author._id, createNotification);
        io.to(recipentSocketId).emit("notification", createNotification);
      } else {
        console.log("user Not connected to socket", blog.author._id.toString());
      }
    }

    await blog.save();
    return res.status(201).json({ message: "Like Populated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

// Unlike Post
export const unlikeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.userId;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    await blog.save();

    return res.json({ message: "Unlike populated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
