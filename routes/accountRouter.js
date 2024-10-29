import { Router } from "express";

import accountController from "../controllers/accountController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/change-password', accountController.changePassword);
router.get('/activation/:link/:userId', accountController.activateAccount);
router.get('/:link', accountController.activateRefferal);
router.delete('/delete-account/:id', accountController.deleteAccount);
router.delete('/delete-all-accounts', (req, res, next) => {
    // await
    return res.json("Deleted");
});

export default router;