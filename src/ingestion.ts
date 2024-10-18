import express from "express";
import { MulterError } from "multer";
import upload from "./fileUpload.ts";
import { readPDF } from "./pdf.ts";

const ingestionRouter = express.Router();

ingestionRouter.post(
  "/",
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err instanceof MulterError) {
        // Multer error
        const error = new Error(`MulterError: ${err.message}`);
        res.status(500).json({ error: error.message });
      } else if (err) {
        // General error
        res.status(500).json(err);
      } else {
        // Proceed to the next middleware if no errors
        next();
      }
    });
  },
  async (req, res) => {
    await readPDF(req, res);
  }
);

export { ingestionRouter };
