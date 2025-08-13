import Router from "express";
import userRoute from "./userRoute.js";
import blogRoute from "./blogRoute.js";
import commentRoute from "./commentRoute.js";
import pushRoute from "./pushhRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/blog", blogRoute);
router.use("/comment", commentRoute);
router.use("/notification", pushRoute);

export default router;
