import express from "express";

import pdfRouter from "./pdf.ts";

const router = express.Router();

router.use("/pdf", pdfRouter);

export default router;
