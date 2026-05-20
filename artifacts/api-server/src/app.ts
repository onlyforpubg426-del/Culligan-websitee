import express, { type Express } from "express";
import cors from "cors";
// Change: import as a namespace and extract default
import * as pinoHttpModule from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Use the default export explicitly
const pinoHttp = pinoHttpModule.default;

app.use(
  pinoHttp({
    logger,
    serializers: {
      // Add explicit type for 'req' parameter
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      // Add explicit type for 'res' parameter
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
