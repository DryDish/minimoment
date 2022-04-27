import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

const router = express.Router();

router.post("/login", async (req, res) => {
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
  
export default router;
