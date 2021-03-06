import { Schema, model } from "mongoose";
import contactInfo from "../mysql/contact-info";

export interface ContactInfoInterface {
  phoneNumber: string;
  countryCode: string;
  city: string;
  postalCode: string;
  addressOne: string;
  addressTwo: string;
}

export const contactInfoSchema = new Schema<ContactInfoInterface>(
  {
    phoneNumber: { type: String, maxlength: 20, required: true },
    countryCode: { type: String, maxlength: 3, required: true },
    city: { type: String, maxlength: 97, required: true },
    postalCode: { type: String, maxlength: 8, required: true },
    addressOne: { type: String, maxlength: 255, required: true },
    addressTwo: { type: String, maxlength: 255, required: false },
  },
  { collection: "contactInfo", autoCreate: false, _id: false }
);

export const ContactInfo = model<ContactInfoInterface>(
  "ContactInfo",
  contactInfoSchema
);
