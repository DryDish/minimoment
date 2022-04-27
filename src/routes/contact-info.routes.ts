import express from "express";
import { sequelize } from "../services/sequelize.service";
import { ContactInfo } from "../models/contact-info";

const router = express.Router();
const contactInfo = sequelize.models.ContactInfo;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await contactInfo.findAll();

  res.send({ contactInfo: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await contactInfo.findByPk(id);

  if (result) {
    res.send({ contactInfo: result });
  } else {
    res.status(404).send("Contact Info not found.");
  }
});

router.post("/", async (req, res) => {
  const { phoneNumber, countryCode, city, postalCode, addressOne, addressTwo } =
    req.body;

  const info = ContactInfo.build({
    phoneNumber,
    countryCode,
    city,
    postalCode,
    addressOne,
    addressTwo,
  });

  const result = await info.save();

  res.status(201).send({ contactInfo: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { phoneNumber, countryCode, city, postalCode, addressOne, addressTwo } =
    req.body;
  const infoToEdit = await contactInfo.findByPk(id);

  if (infoToEdit) {
    const result = await infoToEdit.update({
      phoneNumber,
      countryCode,
      city,
      postalCode,
      addressOne,
      addressTwo,
    });

    res.send({ contactInfo: result });
  } else {
    res.status(404).send("Contact Info not found.");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const contactInfoToDelete = await contactInfo.findByPk(id);

  if (contactInfoToDelete) {
    await contactInfoToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send("Contact Info not found.");
  }
});

export default router;
