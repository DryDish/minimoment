import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Order } from "../models/order";

const router = express.Router();
const orders = sequelize.models.Order;

// GET all orders
router.get("/",async (_, res) => {
    const result = await orders.findAll().catch((error) => {
        console.log(error);
    });

    res.send({ orders: result });
});

// GET by order id
router.get("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const result = await orders.findByPk(orderId).catch((error) => {
        console.log(error);
    });

    if (result) {
        res.send({ order: result });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

// GET order(s) by user id
router.get("/by-user/:userId", async (req, res) => {
    const { userId } = req.params;

    const result = await orders.findAndCountAll({
        where: {
            userId: userId
        }
    }).catch((error) => {
        console.log(error);
    });

    if (result) {
        res.send({ orders: result })
    }
});

// POST create new order
router.post("/", async (req, res) => {
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

    const result = await order.save().catch((error) => {
        console.log(error);
    });

    res.status(201).send({ order: result });
});

// PATCH update order
router.patch("/:orderId", async (req, res) => {
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

    const orderToEdit = await orders.findByPk(orderId).catch((error) => {
        console.log(error);
    });

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
router.delete("/:orderId", async (req, res) => {
    const { orderId } = req.params;

    const orderToDelete = await orders.findByPk(orderId).catch((error) => {
        console.log(error);
    });

    if (orderToDelete) {
        await orderToDelete.destroy().catch((error) => {
            console.log(error);
        });

        res.send({ message: "Success" });
    } else {
        res.status(404).send({ error: 404, message: "Order not found." });
    }
});

export default router;