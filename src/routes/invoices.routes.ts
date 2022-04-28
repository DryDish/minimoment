import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Invoice } from "../models/invoice";

const router = express.Router();
const invoices = sequelize.models.Invoice;

router.get("/", async (_, res) => {
    const result = await invoices.findAll();
  
    res.send({ invoices: result });
});