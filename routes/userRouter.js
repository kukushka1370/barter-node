import { Router } from "express";

import userController from "../controllers/userController.js";
import checkAuth from "../middleware/authMiddleware.js";
import { User } from "../models/user-model.js";

const router = new Router();

router.get('/', userController.getAllUsers); // checkAuth
router.post('/set/app-or-decline', userController.approveOrDecline); // checkAuthrating, userId, review
router.post('/update-rating', userController.updateUserRating); // checkAuthrating, userId, review

router.get('/find/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        return res.json(user);
    } catch (err) {
        next(err);
    }
});

export default router;