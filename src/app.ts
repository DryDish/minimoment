import "dotenv/config";
import express from "express";
import { authenticate as mysqlConnect } from "./services/sequelize.service";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import RolesRouter from "./routes/roles.routes";
import AuthRouter from "./routes/auth.routes";
import DiscountCodesRouter from "./routes/discounts-codes.routes";
import DiscountTypesRouter from "./routes/discounts-types.routes";
import ContactInfoRouter from "./routes/contact-info.routes";
import UsersRouter from "./routes/users.routes";
import StatusesRouter from "./routes/statuses.routes";
import SubscriptionTypesRouter from "./routes/subscription-types.routes";
import SubscriptionsRouter from "./routes/subscriptions.routes";
import SizesRouter from "./routes/sizes.router";
import AccountingRouter from "./routes/accounting.routes";
import OrderRouter from "./routes/orders.routes";
import OrderItemsRouter from "./routes/order-items.routes";
import InvoicesRouter from "./routes/invoices.routes";
import PaperTypeRouter from "./routes/paper-types.routes";

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;

// Connect to the database
mysqlConnect();

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
app.use("/stock/paper-types", PaperTypeRouter);
app.use("/subscriptions/types", SubscriptionTypesRouter);
app.use("/subscriptions", SubscriptionsRouter);
app.use("/stock/sizes", SizesRouter);
app.use("/reports", AccountingRouter);

app.all("*", (_, res) => {
  res.status(400).send({ error: 400, message: "Bad Request." });
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
