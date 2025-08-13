import { getComments, create } from "../controller/commentController.js";
import Router from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create/:id", isAuthenticated, create);
router.get("/get-comment/:id", isAuthenticated, getComments);

export default router;
