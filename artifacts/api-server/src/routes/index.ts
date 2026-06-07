import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ordersRouter from "./orders";
import leadsRouter from "./leads";
import contactRouter from "./contact";
import subscriptionsRouter from "./subscriptions";
import eventsRouter from "./events";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ordersRouter);
router.use(leadsRouter);
router.use(contactRouter);
router.use(subscriptionsRouter);
router.use(eventsRouter);

export default router;
