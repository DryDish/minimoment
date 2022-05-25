import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { Invoice, InvoiceInterface } from "../../models/mongo/invoice";
import { Order, OrderInterface } from "../../models/mongo/order";
import { GenericService } from "../../services/mongo/generic-model.service";
import { StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const invoiceService = new GenericService<InvoiceInterface>(Invoice);
const orderService = new GenericService<OrderInterface>(Order);

router.get("/", async (_, res) => {
  const result = await invoiceService.findAll();
  resultHandler("Invoices", result, res);
});

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await invoiceService.findOne(id);
  resultHandler("Invoice", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const orderResult = await orderService.findOne(requestObject.orderId);

  if (orderResult.status === StatusCode.Success) {
    const invoiceObject = {
      order: orderResult.entity!,
      createdAt: requestObject.createdAt,
    };
    const result = await invoiceService.create(invoiceObject);
    return resultHandler("Invoice", result, res);
  } else {
    return resultHandler("Order", orderResult, res);
  }
});

router.patch("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);
  const orderResult = await orderService.findOne(requestObject.orderId);

  if (orderResult.status === StatusCode.Success) {
    const result = await invoiceService.update(id, {
      order: orderResult.entity!,
      createdAt: requestObject.createdAt,
    });
    resultHandler("Invoice", result, res);
  } else {
    resultHandler("Invoice", orderResult, res);
  }
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await invoiceService.delete(id);
  resultHandler("Invoice", result, res);
});

const filterBody = (body: { orderId: any; createdAt: any }) => {
  const { orderId, createdAt } = body;
  return { orderId, createdAt };
};

export default router;
