import express from "express";

import AccountingRouter from "./mongo/accounting.routes"
import RoleRouter from "./mongo/role.routes";
import SubscriptionTypeRouter from "./mongo/subscription-types.routes"

const router = express.Router();

router.use("/reports", AccountingRouter);
router.use("/admin/roles", RoleRouter);
router.use("/subscriptions/types", SubscriptionTypeRouter);

export default router;
