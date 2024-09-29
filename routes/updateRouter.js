import { Router } from "express";
import updateController from "../controllers/updateController.js";

const router = new Router();

router.get("/", updateController.getLatestUpdates);

export default router;