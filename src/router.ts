import express from "express";

import { ingestionRouter } from "./ingestion.ts";

const router = express.Router();

router.use("/pdf", ingestionRouter);

export default router;
