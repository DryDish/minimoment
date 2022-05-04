import express from "express";
import { MonthlyReport } from "../models/monthly-report";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/monthly", async (_, res) => {
  try {
    const result = await MonthlyReport.findAll();
    res.status(200).send(result);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve monthly reports", 500, error);
  }
});

router.get("/invoices", (_, res) => {
  res.redirect("/invoices");
});

export default router;
