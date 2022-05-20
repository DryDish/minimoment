import express from "express";

import AccountingRouter from "./mongo/accounting.routes";
import RoleRouter from "./mongo/role.routes";
import SubscriptionTypeRouter from "./mongo/subscription-types.routes";
import DiscountCodeRouter from "./mongo/discount-codes.routes";
import PictureRouter from "./mongo/pictures.routes";
import InvoiceRouter from "./mongo/invoices.routes";
import StatusRouter from "./mongo/statuses.routes";
import SubscriptionRouter from "./mongo/subscriptions.routes";

const router = express.Router();

router.use("/reports", AccountingRouter);
router.use("/admin/roles", RoleRouter);
router.use("/admin/statuses", StatusRouter);
router.use("/subscriptions", SubscriptionRouter);
router.use("/subscriptions/types", SubscriptionTypeRouter);
router.use("/discounts/codes", DiscountCodeRouter);
router.use("/pictures", PictureRouter);
router.use("/invoices", InvoiceRouter);

export default router;
