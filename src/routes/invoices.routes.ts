import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Invoice } from "../models/invoice";

const router = express.Router();
const invoices = sequelize.models.Invoice;

router.get("/", async (_, res) => {
    const result = await invoices.findAll().catch((error) => {
        console.log(error);
    });
  
    res.send({ invoices: result });
});

router.get("/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const result = await invoices.findByPk(invoice_id).catch((error) => {
        console.log(error);
    });
  
    if (result) {
        res.send({ invoice: result });
    } else {
        res.status(404).send({ error: 404, message: "Invoice not found." });
    }
});

router.post("/",async (req, res) => {
    const {
        orderId,
        createdAt,
    } = req.body;

    const invoice = Invoice.build({
        orderId,
        createdAt,
    });

    const result = await invoice.save().catch((error) => {
        console.log(error);
    });

    res.status(201).send({ invoice: result });
});

router.patch("/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const {
        orderId,
        createdAt,
    } = req.body;
  
    const invoiceToEdit = await invoices.findByPk(invoice_id).catch((error) => {
        console.log(error);
    });
  
    if (invoiceToEdit) {
        const result = await invoiceToEdit.update({
            orderId,
            createdAt,
        }).catch((error) => {
            console.log(error);
        });
  
        res.send({ invoice: result });
    } else {
        res.status(404).send({ error: 404, message: "invoice not found." });
    }
});

router.delete("/:invoice_id", async (req, res) => {
    const { invoice_id } = req.params;
    const invoiceToEdit = await invoices.findByPk(invoice_id).catch((error) => {
        console.log(error);
    });

    if (invoiceToEdit) {
        await invoiceToEdit.destroy().catch((error) => {
            console.log(error);
        });

        res.send({ message: "Success!" });
    } else {
        res.status(404).send({ error: 404, message: "Invoice not found." });
    }
});

export default router;