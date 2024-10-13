import { Router } from "express";

import productRouter from "./productRouter.js";
import authRouter from "./authRouter.js";
import accountRouter from "./accountRouter.js";
import userRouter from "./userRouter.js";
import bankAccountRouter from "./bankAccountRouter.js";
import statsRouter from "./statsRouter.js";
import updateRouter from "./updateRouter.js";
import messageRouter from "./messageRouter.js";
import pageRouter from "./pageRouter.js";
import chatRouter from "./chatRouter.js";

const router = new Router();

router.use('/product', productRouter);
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/statistics', statsRouter);
router.use('/updates', updateRouter);
router.use('/users', userRouter);
router.use('/bank', bankAccountRouter);
router.use('/message', messageRouter);
router.use('/chat', chatRouter);
router.use('/pages', pageRouter);

export default router;