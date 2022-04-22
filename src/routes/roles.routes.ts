import express from "express";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const roles = sequelize.models.Role;

router.get("/", async (req, res) => {
  const result = await roles.findAll();

  res.send({ roles: result });
});

export default router;
