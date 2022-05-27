import "dotenv/config";
import express from "express";
import "./config/sequelize.config";
import "./config/mongoose.config";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import AuthRouter from "./routes/mysql/auth.routes";
import MysqlRouter from "./routes/mysql-master.router"
import MongoRouter from "./routes/mongo-master.router"

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send({ response: "Hello World!" });
});

app.use(AuthRouter);

app.use(AuthMiddleware);

app.use("/mysql", MysqlRouter);
app.use("/mongo", MongoRouter);


app.all("*", (_, res) => {
  res.status(400).send({ error: 400, message: "Bad Request." });
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
