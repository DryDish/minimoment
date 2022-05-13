import express from "express";
import { Invoice } from "../models/mysql/invoice";
import { GenericService } from "../services/mysql/generic-model.service";
import { resultHandler } from "../utils/response-handler.utils";

const router = express.Router();
const InvoiceService = new GenericService(Invoice);

router.get("/", async (_, res) => {
  const result = await InvoiceService.findAll();
  resultHandler("Invoices", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await InvoiceService.findOne(id);
  resultHandler("Invoice", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await InvoiceService.create(requestObject);
  resultHandler("Invoice", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await InvoiceService.update(id, requestObject);
  resultHandler("Invoice", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await InvoiceService.delete(id);
  resultHandler("Invoice", result, res);
});

const filterBody = (body: { orderId: any; createdAt: any }) => {
  const { orderId, createdAt } = body;
  return { orderId, createdAt };
};

export default router;
