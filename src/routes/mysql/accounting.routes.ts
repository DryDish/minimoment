import express, { Response } from "express";
import { AccountingService } from "../../services/mysql/accounting.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();

router.get("/monthly", async (_, res: Response) => {
  const result = await AccountingService.findAll();
  resultHandler("Monthly reports", result, res);
});

router.get("/invoices", (_, res) => {
  res.redirect("/invoices");
});

export default router;
