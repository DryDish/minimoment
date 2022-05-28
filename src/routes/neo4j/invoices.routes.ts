import express from "express";
import { Invoice } from "../../models/neo4j/invoice";
import { InvoiceService } from "../../services/neo4j/invoice.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const invoiceService = new InvoiceService(Invoice);

router.get("/", async (_, res) => {
  const result = await invoiceService.findAll();
  resultHandler("Invoices", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await invoiceService.findOne(id);
  resultHandler("Invoice", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await invoiceService.create(requestObject);
  resultHandler("Invoice", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await invoiceService.update(id, requestObject);
  resultHandler("Invoice", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await invoiceService.delete(id);
  resultHandler("Invoice", result, res);
});

const filterBody = (body: { order_id: any; created_at: any }) => {
  const { order_id, created_at } = body;
  return { order_id, created_at };
};

export default router;
