import express from "express";
import { PaperType } from "../models/paper-type";
import { sequelize } from "../services/sequelize.service";

const router = express.Router();
const paperTypes = sequelize.models.PaperType;

// GET all paper_types
router.get("/", async (_, res) => {
    const result = await paperTypes.findAll().catch((error) => {
        console.log(error);
    });

    if (result) {
        res.send({ paperTypes: result });
    } else {
        res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

// GET paper_type by paper_type_id
router.get("/:paper_type_id", async (req, res) => {
    const { paper_type_id } = req.params;

    const result = await paperTypes.findByPk(paper_type_id).catch((error) => {
        console.log(error);
    });

    if (result) {
        res.status(201).send({ paperType: result });
    } else {
        res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

// POST create a new paper_type
router.post("/", async (req, res) => {
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

    const result = await paperType.save().catch((error) => {
        console.log(error);
    });

    res.status(201).send({ paperType: result });
});

// PATCH update paper_type by paper_type_id
router.patch("/:paper_type_id", async (req, res) => {
    const { paper_type_id } = req.params;

    const {
        name,
        multiplier,
        sizeId,
        discountCodeId,
    } = req.body;

    const paperTypeToEdit = await paperTypes.findByPk(paper_type_id).catch((error) => {
        console.log(error);
    });

    if (paperTypeToEdit) {
        const result = await paperTypeToEdit.update({
            name,
            multiplier,
            sizeId,
            discountCodeId,
        });

        res.status(201).send({ paperType: result });
    } else {
        res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

// TODO: This one fails for some reason i expect because of triggers or other
router.delete("/:paper_type_id", async (req, res) => {
    const { paper_type_id } = req.params;
    const paperTypeDelete = await paperTypes.findByPk(paper_type_id).catch((error) => {
        console.log(error);
    });
  
    if (paperTypeDelete) {
      await paperTypeDelete.destroy().catch((error) => {
        console.log(error);
      });
  
      res.status(201).send({ message: "Success!" });
    } else {
      res.status(404).send({ error: 404, message: "Paper type not found." });
    }
});

export default router;
