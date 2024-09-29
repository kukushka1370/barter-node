import { Router } from "express";
import chatController from "../controllers/chatController.js";

const router = new Router();

router.post("/", chatController.createChat);
router.get("/:userId", chatController.findUserChats);
router.get("/find/:firstId/:secondId", chatController.findChat);

export default router;