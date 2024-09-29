import { Router } from "express";
import messageController from "../controllers/messageController.js";

const router = new Router();

router.post("/", messageController.createMessage);
router.get("/:chatId", messageController.getMessages);
router.get("/group-chat/all", messageController.getGroupChatMessages);
router.post("/group-chat/new", messageController.createGroupChatMessage);

export default router;