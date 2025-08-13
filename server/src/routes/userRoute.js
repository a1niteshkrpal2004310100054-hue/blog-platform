import Router from "express";
import {
  register,
  userLogin,
  userLogout,
  refresh,
  editProfile,
  getUser,
} from "../controller/userController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", userLogin);
router.get("/getUser", isAuthenticated, getUser);
router.post("/logout", userLogout);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  isAuthenticated,
  editProfile
);
router.get("/me", refresh);

export default router;
