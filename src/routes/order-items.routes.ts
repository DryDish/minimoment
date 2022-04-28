import express from "express";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const orderItems = sequelize.models.OrderItem;

router.get("/order_items", async (_, res) => {
    const result = await orderItems.findAll();

    if (result) {
        res.send({ orderItems: result });
    } else {
        res.status(404).send({ error: 404, message: "order items not found." });
    }
});