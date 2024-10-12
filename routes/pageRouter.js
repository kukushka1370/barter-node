import path from "path";
import { Router } from "express";
import { fileURLToPath } from "url";

const router = new Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/get-user-agreement', (req, res, next) => {
    try {
        console.log("fjpe");
        return res.sendFile(path.resolve(__dirname, "..", "pages", "user-agreement.html")); //
    } catch (err) {
        next(err);
    }
});
router.get('/get-rules', (req, res, next) => {
    try {
        return res.sendFile(path.resolve(__dirname, "..", "pages", "rules.html")); //
    } catch (err) {
        next(err);
    }
});

export default router;