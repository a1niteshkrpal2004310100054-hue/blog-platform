import Router from "express";
import { create } from "../controller/blogController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", upload.single("image"), isAuthenticated, create);

export default router;
