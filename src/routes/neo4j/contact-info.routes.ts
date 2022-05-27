import express from "express";
import { ContactInfo } from "../../models/neo4j/contact-info";
import { GenericService } from "../../services/neo4j/generic-model.service";
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
  phone_number: any;
  country_code: any;
  city: any;
  postal_code: any;
  address_one: any;
  address_two: any;
}) => {
  const { phone_number, country_code, city, postal_code, address_one, address_two = null } =
    body;
  return { phone_number, country_code, city, postal_code, address_one, address_two };
};

export default router;

