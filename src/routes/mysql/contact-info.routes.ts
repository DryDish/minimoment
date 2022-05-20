import express from "express";
import { ContactInfo } from "../../models/mysql/contact-info";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const ContactInfoService = new GenericService(ContactInfo);

router.get("/", async (_, res) => {
  const result = await ContactInfoService.findAll();
  resultHandler("Contact Info", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await ContactInfoService.findOne(id);
  resultHandler("Contact Info", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await ContactInfoService.create(requestObject);
  resultHandler("Contact Info", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await ContactInfoService.update(id, requestObject);
  resultHandler("Contact Info", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await ContactInfoService.delete(id);
  resultHandler("Contact Info", result, res);
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
