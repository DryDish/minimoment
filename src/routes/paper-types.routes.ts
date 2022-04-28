import express from "express";
import { PaperType } from "../models/paper-type";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const paperTypes = sequelize.models.PaperType;

router.get("/stock/paper_type/", async (_, res) => {
    const result = await paperTypes.findAll();

    if (result) {
        res.send({ paperTypes: result });
    } else {
        res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

router.get("/stock/paper_type/:paper_type_id", async (req, res) => {
    const { paper_type_id } = req.params;

    const result = await paperTypes.findByPk(paper_type_id);

    if (result) {
        res.status(201).send({ paperType: result });
    } else {
        res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

router.post("/stock/paper_type/", async (req, res) => {
    const {
        name,
        multiplier,
        sizeId,
        discountCodeId,
    } = req.body;

    const paperType = PaperType.build({
        name,
        multiplier,
        sizeId,
        discountCodeId,
    });

    const result = await paperType.save();

    res.status(201).send({ paperType: result });
});

