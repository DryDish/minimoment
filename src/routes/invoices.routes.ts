import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Invoice } from "../models/invoice";

const router = express.Router();
const invoices = sequelize.models.Invoice;

router.get("/invoices", async (_, res) => {
    const result = await invoices.findAll();
  
    res.send({ invoices: result });
});

router.get("/invoices/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const result = await invoices.findByPk(invoice_id);
  
    if (result) {
        res.send({ invoice: result });
    } else {
        res.status(404).send({ error: 404, message: "Invoice not found." });
    }
});

router.post("/invoices",async (req, res) => {
    const {
        orderId,
        createdAt,
    } = req.body;

    const invoice = Invoice.build({
        orderId,
        createdAt,
    });

    const result = await invoice.save();

    res.status(201).send({ invoice: result });
});

router.patch("/invoices/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const {
        orderId,
        createdAt,
    } = req.body;
  
    const invoiceToEdit = await invoices.findByPk(invoice_id);
  
    if (invoiceToEdit) {
        const result = await invoiceToEdit.update({
            orderId,
            createdAt,
        });
  
        res.send({ invoice: result });
    } else {
        res.status(404).send({ error: 404, message: "invoice not found." });
    }
});

router.delete("/invoices/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const invoiceToEdit = await invoices.findByPk(invoice_id);

    if (invoiceToEdit) {
        await invoiceToEdit.destroy();

        res.send({ message: "Success!" });
    } else {
        res.status(404).send({ error: 404, message: "Invoice not found." });
    }
});

export default router;