import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { authenticate as mysqlConnect } from "./services/sequelize.service";

// Import middleware
import AuthMiddleware from "./middleware/authenticate.middleware";

// Import routes
import RolesRouter from "./routes/roles.routes";

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

// Connect to the database
mysqlConnect();

// Sync models
// TODO: Look into the preffered approach
// User has no permissions to drop and create tables on schema.
// sequelize.sync({ alter: true }).then(() => {
//   console.log("All models synchronized successfully.");
// });

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ response: "Hello World!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // TODO: Find user by username

  // TODO: replace userPassword with the real User's hashed password
  const userPassword = await bcrypt.hash(password, 10);

  bcrypt.compare(password, userPassword, (error, same) => {
    if (error) {
      res.status(401).send("Unauthorized");
    } else if (!same) {
      res.status(401).send("Unauthorized");
    } else {
      jwt.sign(
        { user: username },
        SECRET_KEY,
        { expiresIn: "24h" },
        (error: Error | null, token: string | undefined) => {
          if (error) res.sendStatus(500);
          else
            res.send({
              user: { username },
              token,
            });
        }
      );
    }
  });
});

app.use(AuthMiddleware);

app.use("/roles", RolesRouter);

app.all("*", (_, res) => {
  res.status(400).send("Bad Request");
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
