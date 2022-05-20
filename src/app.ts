import "dotenv/config";
import express from "express";
import "./config/sequelize.config";
import "./config/mongoose.config";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import RolesRouter from "./routes/mysql/roles.routes";
import AuthRouter from "./routes/mysql/auth.routes";
import DiscountCodesRouter from "./routes/mysql/discount-codes.routes";
import DiscountTypesRouter from "./routes/mysql/discount-types.routes";
import ContactInfoRouter from "./routes/mysql/contact-info.routes";
import UsersRouter from "./routes/mysql/users.routes";
import StatusesRouter from "./routes/mysql/statuses.routes";
import SubscriptionTypesRouter from "./routes/mysql/subscription-types.routes";
import SubscriptionsRouter from "./routes/mysql/subscriptions.routes";
import SizesRouter from "./routes/mysql/sizes.routes";
import AccountingRouter from "./routes/mysql/accounting.routes";
import OrderRouter from "./routes/mysql/orders.routes";
import OrderItemsRouter from "./routes/mysql/order-items.routes";
import InvoicesRouter from "./routes/mysql/invoices.routes";
import PaperTypesRouter from "./routes/mysql/paper-types.routes";
import FramesRouter from "./routes/mysql/frames.routes";
import PicturesRouter from "./routes/mysql/pictures.routes";

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ response: "Hello World!" });
});

app.use(AuthRouter);

app.use(AuthMiddleware);

app.use("/admin/roles", RolesRouter);
app.use("/admin/statuses", StatusesRouter);
app.use("/discounts/codes", DiscountCodesRouter);
app.use("/discounts/types", DiscountTypesRouter);
app.use("/contact-info", ContactInfoRouter);
app.use("/users", UsersRouter);
app.use("/orders", OrderRouter);
app.use("/order-items", OrderItemsRouter);
app.use("/invoices", InvoicesRouter);
app.use("/stock/sizes", SizesRouter);
app.use("/stock/paper-types", PaperTypesRouter);
app.use("/stock/frames", FramesRouter);
app.use("/subscriptions/types", SubscriptionTypesRouter);
app.use("/subscriptions", SubscriptionsRouter);
app.use("/reports", AccountingRouter);
app.use("/pictures", PicturesRouter);

app.all("*", (_, res) => {
  res.status(400).send({ error: 400, message: "Bad Request." });
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
