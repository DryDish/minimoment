import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Order } from "../models/order";
import { Op } from "sequelize/types";

const router = express.Router();
const orders = sequelize.models.Order;

// GET all orders
router.get("/order",async (_, res) => {
    const result = await orders.findAll();

    res.send({ orders: result });
});

// GET by order id
router.get("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const result = await orders.findByPk(orderId);

    if (result) {
        res.send({ order: result });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

// GET order(s) by user id
router.get("/order/by-user/:userId", async (req, res) => {
    const { userId } = req.params;

    const result = await orders.findAndCountAll({
        where: {
            userId: {
                [Op.like]: userId
            }
        }
    });

    if (result) {
        res.send({ orders: result })
    }
});

// POST create new order
router.post("/order", async (req, res) => {
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

// PATCH update order
router.patch("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const {
        discountCodeId,
        userId,
        billingContactInfoId,
        statusId,
        orderPrice,
        totalPriceSaved,
        createdAt,
    } = req.body;

    const orderToEdit = await orders.findByPk(orderId);

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

        res.send({ order: result });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

// DELETE order
router.delete("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;

    const orderToDelete = await orders.findByPk(orderId);

    if (orderToDelete) {
        await orderToDelete.destroy();

        res.send({ message: "Success" });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

export default router;