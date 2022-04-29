import express from "express";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const orderItems = sequelize.models.OrderItem;

// GET a list of order_items by order_id
router.get("/by-order/:order_id", async (req, res) => {
    const { order_id } = req.params;

    const orderItemList = await orderItems.findAndCountAll({
        where: {
            orderId: order_id,
        },
    }).catch((error) => {
        console.log(error);
    });

    // This returns an object that looks like this => orderItems: { count: 2, rows: [ orderItem, orderItem ]}
    if (orderItemList) {
        res.send({ orderItems: orderItemList });
    } else {
        res.status(404).send({ error: 404, message: "Order items not found." });
    }
});

// GET single order_item by order_item_id
router.get("/:order_item_id", async (req, res) => {
    const { order_item_id } = req.params;

    const result = await orderItems.findByPk(order_item_id).catch((error) => {
        console.log(error);
    });

    if (result) {
        res.status(201).send({ orderItem: result });
    } else {
        res.status(404).send({ error: 404, message: "Order items not found." });
    }
});

export default router;