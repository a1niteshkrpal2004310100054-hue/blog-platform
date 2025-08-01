import { Blog } from "../model/blogModel";

// Like Post
export const likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.userId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    const isliked = blog.likes.includes(userId);
    if (isliked) {
      return req.json({ message: "Already liked" });
    }

    blog.likes.push(userId);
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
