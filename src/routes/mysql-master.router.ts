import express from "express";

const router = express.Router();

import DiscountCodesRouter      from "./mysql/discount-codes.routes";
import DiscountTypesRouter      from "./mysql/discount-types.routes";
import ContactInfoRouter        from "./mysql/contact-info.routes";
import UsersRouter              from "./mysql/users.routes";
import StatusesRouter           from "./mysql/statuses.routes";
import SubscriptionTypesRouter  from "./mysql/subscription-types.routes";
import SubscriptionsRouter      from "./mysql/subscriptions.routes";
import SizesRouter              from "./mysql/sizes.routes";
import AccountingRouter         from "./mysql/accounting.routes";
import OrderRouter              from "./mysql/orders.routes";
import OrderItemsRouter         from "./mysql/order-items.routes";
import InvoicesRouter           from "./mysql/invoices.routes";
import PaperTypesRouter         from "./mysql/paper-types.routes";
import FramesRouter             from "./mysql/frames.routes";
import PicturesRouter           from "./mysql/pictures.routes";
import RolesRouter              from "./mysql/roles.routes";

router.use("/admin/roles",          RolesRouter);
router.use("/admin/statuses",       StatusesRouter);
router.use("/discounts/codes",      DiscountCodesRouter);
router.use("/discounts/types",      DiscountTypesRouter);
router.use("/contact-info",         ContactInfoRouter);
router.use("/users",                UsersRouter);
router.use("/orders",               OrderRouter);
router.use("/order-items",          OrderItemsRouter);
router.use("/invoices",             InvoicesRouter);
router.use("/stock/sizes",          SizesRouter);
router.use("/stock/paper-types",    PaperTypesRouter);
router.use("/stock/frames",         FramesRouter);
router.use("/subscriptions/types",  SubscriptionTypesRouter);
router.use("/subscriptions",        SubscriptionsRouter);
router.use("/reports",              AccountingRouter);
router.use("/pictures",             PicturesRouter);

export default router;
