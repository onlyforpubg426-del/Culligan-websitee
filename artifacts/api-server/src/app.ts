import express, { type Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Custom logging middleware (replaces pino-http)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request
  logger.info({
    msg: "incoming request",
    method: req.method,
    url: req.url?.split("?")[0],
    query: req.query,
    ip: req.ip,
  });

  // Capture response finish
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      msg: "request completed",
      method: req.method,
      url: req.url?.split("?")[0],
      statusCode: res.statusCode,
      duration_ms: duration,
    });
  });

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
