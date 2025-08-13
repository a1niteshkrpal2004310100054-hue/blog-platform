import Router from "express";
import {
  create,
  blogUpload,
  getBlogById,
  getBlogByUserId,
  getAllBlog,
} from "../controller/blogController.js";
import { likeBlog, unlikeBlog } from "../controller/likeController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", upload.single("image"), isAuthenticated, create);
router.post(
  "/blogUpload",
  upload.single("contentImage"),
  isAuthenticated,
  blogUpload
);
router.get("/get-blog", isAuthenticated, getAllBlog);
router.post("/get-blog/:id", isAuthenticated, getBlogById);
router.get("/get-blog-byuser", isAuthenticated, getBlogByUserId);

// for like blog
router.post("/like/:id", isAuthenticated, likeBlog);
router.post("/unlike/:id", isAuthenticated, unlikeBlog);

export default router;
