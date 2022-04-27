import "dotenv/config";
import express from "express";
import { authenticate as mysqlConnect } from "./services/sequelize.service";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import RolesRouter from "./routes/roles.routes";
import AuthRouter from "./routes/auth.routes";

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;

// Connect to the database
mysqlConnect();

// Sync models
// TODO: Look into the preferred approach
// User has no permissions to drop and create tables on schema.
// sequelize.sync({ alter: true }).then(() => {
//   console.log("All models synchronized successfully.");
// });

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ response: "Hello World!" });
});

app.use(AuthRouter);

app.use(AuthMiddleware);

app.use("/roles", RolesRouter);

app.all("*", (_, res) => {
  res.status(400).send("Bad Request");
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
