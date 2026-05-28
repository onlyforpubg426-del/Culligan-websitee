import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ordersRouter from "./orders";
import leadsRouter from "./leads";
import contactRouter from "./contact";
import eventsRouter from "./events";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ordersRouter);
router.use(leadsRouter);
router.use(contactRouter);
router.use(eventsRouter);

export default router;
