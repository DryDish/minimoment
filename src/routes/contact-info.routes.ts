import express from "express";
import { ContactInfo } from "../models/contact-info";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const contactInfoList = await ContactInfo.findAll();
    res.send(contactInfoList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve contact info.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundContactInfo = await ContactInfo.findByPk(id);

    if (foundContactInfo) {
      res.send(foundContactInfo);
    } else {
      sendErrorResponse(res, "Contact info not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve contact info.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const info = ContactInfo.build(requestObject);

  try {
    const savedContactInfo = await info.save();
    res.status(201).send(savedContactInfo);
  } catch (error) {
    sendErrorResponse(res, "Unable to create contact info.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const contactInfoToEdit = await ContactInfo.findByPk(id);
    if (contactInfoToEdit) {
      const updatedContactInfo = await contactInfoToEdit.update(requestObject);
      res.status(200).send(updatedContactInfo);
    } else {
      sendErrorResponse(res, "Contact info not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update contact info.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contactInfoToDelete = await ContactInfo.findByPk(id);
    if (contactInfoToDelete) {
      await contactInfoToDelete.destroy();
      res.status(200).send(contactInfoToDelete);
    } else {
      res.status(404).send("Contact Info not found.");
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete contact info.", 500, error);
  }
});

const filterBody = (body: {
  phoneNumber: any;
  countryCode: any;
  city: any;
  postalCode: any;
  addressOne: any;
  addressTwo: any;
}) => {
  const { phoneNumber, countryCode, city, postalCode, addressOne, addressTwo } =
    body;
  return { phoneNumber, countryCode, city, postalCode, addressOne, addressTwo };
};

export default router;
