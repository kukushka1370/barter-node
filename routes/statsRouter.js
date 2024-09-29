import { Router } from "express";

import statsController from "../controllers/statsController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.get('/', statsController.getStatistics); // checkAuth
router.post('/change-total-money', statsController.updateTotalMoney);

export default router;