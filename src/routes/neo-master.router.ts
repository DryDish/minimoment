import express from "express";
import RoleRouter from "./neo4j/role.routes";
import StatusRouter from "./neo4j/status.routes";
import ContactInfoRouter from "./neo4j/contact-info.routes";
import PictureRouter from "./neo4j/pictures.routes";
import SubscriptionTypeRouter from "./neo4j/subscription-types.routes";
import SubscriptionRouter from "./neo4j/subscriptions.routes";
import DiscountTypeRouter from "./neo4j/discount-types.routes";
import DiscountCodeRouter from "./neo4j/discount-codes.routes";
import SizeRouter from "./neo4j/sizes.router";
import FrameRouter from "./neo4j/frames.routes";
import PaperTypeRouter from "./neo4j/paper-types.routes";

const router = express.Router();

router.use("/admin/roles/", RoleRouter);
router.use("/admin/statuses/", StatusRouter);
router.use("/contact-info", ContactInfoRouter);
router.use("/pictures", PictureRouter);
router.use("/subscriptions/types", SubscriptionTypeRouter);
router.use("/subscriptions", SubscriptionRouter);
router.use("/discounts/types", DiscountTypeRouter);
router.use("/discounts/codes", DiscountCodeRouter);
router.use("/stock/sizes", SizeRouter);
router.use("/stock/frames", FrameRouter);
router.use("/stock/paper-types", PaperTypeRouter);

export default router;
