import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";

import { fileURLToPath } from "url"
import { config } from "dotenv";

import router from "./routes/index.js";
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";
import mongoose from "mongoose";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/", router);
app.use(ErrorHandlingMiddleware);

const launch = async () => {
    try {
        mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`Mongodb connection established\n`))
            .catch(err => console.log(`An error occured while connecting to mongodb ${err.message}\n`));
        app.listen(PORT, () => console.log(`Server is currently running on port: ${PORT}`));
    } catch (e) {
        console.error(e)
    }
}

launch();