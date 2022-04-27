import "dotenv/config";
import express from "express";
import { authenticate as mysqlConnect } from "./services/sequelize.service";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import RolesRouter from "./routes/roles.routes";
import AuthRouter from "./routes/auth.routes";
import DiscountCodesRouter from "./routes/discounts-code.routes";
import DiscountTypesRouter from "./routes/discounts-types.routes";
import ContactInfoRouter from "./routes/contact-info.routes";

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
app.use("/discounts/codes", DiscountCodesRouter);
app.use("/discounts/types", DiscountTypesRouter);
app.use("/contact-info", ContactInfoRouter);

app.all("*", (_, res) => {
  res.status(400).send({ error: 400, message: "Bad Request" });
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
