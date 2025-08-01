import { Blog } from "../model/blogModel.js";
import { User } from "../model/userModel.js";

// extract block Images

const extractBLogImages = (blocks) => {
  let imageUrl = [];
  blocks.forEach((block) => {
    if (block.type === "image" && block.data?.file?.url) {
      imageUrl.push(block.data?.file?.url);
    }
  });
};

export const create = async (req, res) => {
  const UserId = req.user.userId;
  console.log(UserId);
  const { blogType, title, content } = req.body;
  console.log("debug", title, content);

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

    const blog = await Blog.create({
      blogType,
      title,
      content,
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
