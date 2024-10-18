import path from "path";
import multer from "multer";

const upload = multer({ dest: path.resolve("./uploads") });

export default upload;
