import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Order } from "../models/order";

const router = express.Router();
const orders = sequelize.models.Order;

router.get("/",async (_, res) => {
    const result = await orders.findAll();

    res.send({ orders: result });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await orders.findByPk(id);

    if (result) {
        res.send({ order: result });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

router.post("/",async (req, res) => {
    const {
        discountCodeId,
        userId,
        billingContactInfoId,
        statusId,
        orderPrice,
        totalPriceSaved,
        createdAt,
    } = req.body;

    const order = Order.build({
        discountCodeId,
        userId,
        billingContactInfoId,
        statusId,
        orderPrice,
        totalPriceSaved,
        createdAt,
    });

    const result = await order.save();

    res.status(201).send({ order: result });
});

router.patch("/:id",async (req, res) => {
    const { id } = req.params;
    const {
        discountCodeId,
        userId,
        billingContactInfoId,
        statusId,
        orderPrice,
        totalPriceSaved,
        createdAt,
    } = req.body;

    const orderToEdit = await orders.findByPk(id);

    if (orderToEdit) {
        const result = await orderToEdit.update({
            discountCodeId,
            userId,
            billingContactInfoId,
            statusId,
            orderPrice,
            totalPriceSaved,
            createdAt,
        });

        res.send({ result: result });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
})