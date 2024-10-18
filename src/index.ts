import "dotenv/config";
import express from "express";
import router from "./router.ts";

const loggingMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`Request: ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(`Response: ${res.statusCode}`);
  });
  next();
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception happened:", error);

  process.exit(1);
});

/**
 * Starts the server and listens on port 8848.
 */
const server: any = express();

server.use(express.json());

server.use(loggingMiddleware);

server.use(router);

const PORT = 8848;

const app = server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
