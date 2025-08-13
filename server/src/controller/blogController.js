import { Blog } from "../model/blogModel.js";
import { User } from "../model/userModel.js";
import { autoCleanupOldImages } from "../utils/imageCleanup.js";

// create blog api
export const create = async (req, res) => {
  const UserId = req.user.userId;

  const { blogType, title, content } = req.body;

  let allUploadedImages = [];

  try {
    allUploadedImages = JSON.parse(req.body.allUploadedImages || []);
  } catch (error) {
    allUploadedImages = [];
  }
  //field validation
  if ((!blogType, !title, !content)) {
    return res.status(204).json({ message: "No content" });
  }

  try {
    let imageUrl = null;
    const host = req.protocol + "://" + req.host;
    if (req.file) {
      imageUrl = `${host}/uploads/${req.file.filename}`;
    }

    const parsedContent =
      typeof content === "string" ? JSON.parse(content) : content;

    autoCleanupOldImages(parsedContent, allUploadedImages);
    const blog = await Blog.create({
      blogType,
      title,
      content: parsedContent,
      author: UserId,
      ...(imageUrl && { image: imageUrl }),
    });

    // save the blog
    await blog.save();

    // update blog id to the users blog
    await User.findByIdAndUpdate(
      UserId,
      { $push: { blogs: blog._id } },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
};

// upload blog images
export const blogUpload = async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const host = req.protocol + "://" + req.host;
      imageUrl = `${host}/uploads/${req.file.filename}`;
    }

    return res.status(200).json({ message: "image uploaded", url: imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
};

// Get Blog by Id
export const getBlogById = async (req, res) => {
  const blogId = req.params.id;

  if (!blogId) {
    return res.json({ message: "Id is missing" });
  }
  try {
    const blog = await Blog.findById(blogId)
      .populate("author", "username")
      .sort({ createdAt: -1 });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Successfull", blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogByUserId = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.json({ message: "Id is missing" });
  }
  try {
    const blog = await Blog.find({ author: userId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Successfull", blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Blog
export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    if (!blogs) {
      return res.status(400).json({ message: "Bad Request" });
    } else {
      return res.status(201).json({ message: "Success", blogs });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
