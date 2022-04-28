import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Order } from "../models/order";

const router = express.Router();
const orders = sequelize.models.Order;

router.get("/",async (_, res) => {
    const result = await orders.findAll();

    res.send({users: result});
});

