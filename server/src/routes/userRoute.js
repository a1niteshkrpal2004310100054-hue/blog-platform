import Router from "express";
import {
  register,
  userLogin,
  userLogout,
} from "../controller/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
