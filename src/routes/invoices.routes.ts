import express from "express";
import { Invoice } from "../models/mysql/invoice";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const invoiceList = await Invoice.findAll();
    res.status(200).send(invoiceList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve invoices.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundInvoice = await Invoice.findByPk(id);
    if (foundInvoice) {
      res.status(200).send(foundInvoice);
    } else {
      sendErrorResponse(res, "Invoice not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve invoice.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const invoice = Invoice.build(requestObject);
  try {
    const savedInvoice = await invoice.save();
    res.status(201).send(savedInvoice);
  } catch (error) {
    sendErrorResponse(res, "Unable to create invoice.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const invoiceToEdit = await Invoice.findByPk(id);
    if (invoiceToEdit) {
      const updatedInvoice = await invoiceToEdit.update(requestObject);
      res.status(200).send(updatedInvoice);
    } else {
      sendErrorResponse(res, "Invoice not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update invoice.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const invoiceToDelete = await Invoice.findByPk(id);
    if (invoiceToDelete) {
      await invoiceToDelete.destroy();
      res.status(200).send(invoiceToDelete);
    } else {
      sendErrorResponse(res, "Invoice not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update invoice.", 500, error);
  }
});

const filterBody = (body: { orderId: any; createdAt: any }) => {
  const { orderId, createdAt } = body;
  return { orderId, createdAt };
};

export default router;
