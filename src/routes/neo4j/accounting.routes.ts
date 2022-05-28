import express from "express";
import { MonthlyReport } from "../../models/neo4j/monthly-report";
import { GenericService } from "../../services/neo4j/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const MonthlyReportService = new GenericService(MonthlyReport);

router.get("/monthly", async (_, res) => {
  const result = await MonthlyReportService.findAll();
  resultHandler("Monthly Report", result, res);
});

router.get("/invoices", (_, res) => {
  res.redirect("/mysql/invoices");
});

export default router;
