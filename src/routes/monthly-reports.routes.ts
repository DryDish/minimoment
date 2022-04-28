import express from "express";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const monthlyReports = sequelize.models.MonthlyReport;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await monthlyReports.findAll();

  res.send({ monthlyReports: result });
});

export default router;
