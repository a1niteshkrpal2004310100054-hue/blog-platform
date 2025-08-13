import { Comment } from "../model/commentModel.js";
import { Blog } from "../model/blogModel.js";
import { Notification } from "../model/notificationModel.js";
import { io } from "../../app.js";
import { getUserSocketId } from "../socket/socketServer.js";
import { sendPushNotification } from "./pushController.js";

export const create = async (req, res) => {
  const { text } = req.body;
  const blogId = req.params.id;
  const userId = req.user.userId;
  try {
    console.log(text);
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    if (!blogId || !userId) {
      return res.status(400).json({ message: "Invalid blog or userId" });
    }

    const comment = await Comment.create({
      text,
      author: userId,
      blog: blogId,
    });

    const comments = await Comment.findById(comment._id).populate(
      "author",
      "username avatar"
    );

    console.log(comments);

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    try {
      if (blog.author.toString() !== userId) {
        const createNotification = await Notification.create({
          recipent: blog.author,
          sender: comments.author[0],
          type: "comment",
          targetBlog: blog._id,
          message: `commented on your blog "${blog.title}"`,
        });
        const recipientSocketId = getUserSocketId(blog.author.toString());
        if (recipientSocketId) {
          await sendPushNotification(blog.author._id, createNotification);
          io.to(recipientSocketId).emit("notification", createNotification);
        }
      }
    } catch (error) {
      console.error("socket notification failed", error);
    }
    return res.status(201).json({ message: "Comment populated", comments });
  } catch (error) {
    console.error();
  }
};

export const getComments = async (req, res) => {
  const blogId = req.params.id;
  console.log(req.params.id);
  if (!blogId) {
    return res.status(404).json({ message: "Post id is required" });
  }
  try {
    const comments = await Comment.find({ blog: blogId })
      .sort({
        createdAt: -1,
      })
      .populate("author", "username avatar");
    if (!comments) {
      return res.status(400).json({ message: "Comment not found" });
    }
    return res.status(202).json({ comments, message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
