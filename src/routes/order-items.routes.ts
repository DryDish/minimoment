import express from "express";
import { OrderItem } from "../models/order-item";
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

// GET a list of order_items by user_id
router.get("/by-user/:user_id", async (req, res) => {
    const { user_id } = req.params;

    const orderItemList = await orderItems.findAndCountAll({
        where: {
            orderId: user_id,
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

// POST create an order_item
router.post("/", async (req, res) => {
    const {
        pictureDataId,
        paperTypeId,
        frameId,
        orderId,
        orderItemPrice,
        priceSaved,
        amount,
    } = req.body;

    const orderItem = OrderItem.build({
        pictureDataId,
        paperTypeId,
        frameId,
        orderId,
        orderItemPrice,
        priceSaved,
        amount,
    });

    const result = await orderItem.save().catch((error) => {
        console.log(error);
    });

    res.status(201).send({ orderItem: result });
});

// PATCH update an order_item
router.patch("/:order_item_id", async (req, res) => {
    const { order_item_id } = req.params;
    const {
        pictureDataId,
        paperTypeId,
        frameId,
        orderId,
        orderItemPrice,
        priceSaved,
        amount,
    } = req.body;

    const orderItemToEdit = await orderItems.findByPk(order_item_id).catch((error) => {
        console.log(error);
    });

    if (orderItemToEdit) {
        const result = await orderItemToEdit.update({
            pictureDataId,
            paperTypeId,
            frameId,
            orderId,
            orderItemPrice,
            priceSaved,
            amount,
        }).catch((error) => {
            console.log(error);
        });

        res.send({ order: result });
    } else {
        res.status(404).send({ error: 404, message: "Order item not found." });
    }
});

// DELETE an order_item
router.delete("/:order_item_id", async (req, res) => {
    const { order_item_id } = req.params;
    
    const orderItemToDelete = await orderItems.findByPk(order_item_id).catch((error) => {
        console.log(error);
    });

    if (orderItemToDelete) {
        await orderItemToDelete.destroy().catch((error) => {
            console.log(error);
        });

        res.status(201).send({ message: "success" });
    } else {
        res.status(404).send({ error: 404, message: "Order item not found." });
    }
});

export default router;