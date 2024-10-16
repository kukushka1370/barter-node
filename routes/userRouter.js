import { Router } from "express";

import userController from "../controllers/userController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.get('/', userController.getAllUsers); // checkAuth
router.post('/set/app-or-decline', userController.approveOrDecline); // checkAuthrating, userId, review
router.post('/update-rating', userController.updateUserRating); // checkAuthrating, userId, review

export default router;