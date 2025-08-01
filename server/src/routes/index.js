import Router from "express";
import userRoute from "./userRoute.js";
import blogRoute from "./blogRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/blog", blogRoute);

export default router;
