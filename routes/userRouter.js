import { Router } from "express";

import userController from "../controllers/userController.js";
import checkAuth from "../middleware/authMiddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js"

const router = new Router();

router.get('/', userController.getAllUsers); // checkAuth
router.post('/set/app-or-decline', userController.approveOrDecline); // checkAuthrating, userId, review
router.post('/update-rating', userController.updateUserRating); // checkAuthrating, userId, review
router.get('/post-indexes', userController.getPostIndexes);
router.post('/add-post-index', checkRole("admin"), userController.addPostIndex);
router.get('/find/:userId', userController.findUser);
router.post('/update-commission', userController.updatePersonalCOmmission);

export default router;