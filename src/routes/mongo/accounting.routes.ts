import express, { Response } from "express";
import { resultHandler } from "../../utils/response-handler.utils";
import { AccountingService } from "../../services/mongo/accounting.service";

const accountingService = new AccountingService();
const router = express.Router();

router.get("/monthly", async (_, res: Response) => {
  const result = await accountingService.findAll();
  resultHandler("Monthly reports", result, res);
});

router.get("/invoices", (_, res: Response) => {
  res.redirect("/mongo/invoices");
});

export default router;
