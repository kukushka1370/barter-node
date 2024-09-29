import { fileURLToPath } from "url";
import * as uuid from "uuid";
import path from "path";

class FileService {
    saveImg(img) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            return fileName;
        } catch (e) {
            return null;
        }
    }
}

export default new FileService();