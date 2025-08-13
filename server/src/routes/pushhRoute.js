import Router from "express";
import { subscribe } from "../controller/pushController.js";
import {
  getNotification,
  deleteNotification,
  markAllAsRead,
} from "../controller/notificationController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/subscribe-notification", subscribe);
router.get("/get-notifications", isAuthenticated, getNotification);
router.patch("/mark-all-read", isAuthenticated, markAllAsRead);
router.delete("/delete-notification/:id", isAuthenticated, deleteNotification);

export default router;
