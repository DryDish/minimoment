import { ContactInfo } from "../../models/mysql/contact-info";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";

export const ContactInfoService = {
  findAll: async (): Promise<CustomResult<ContactInfo[]>> => {
    try {
      const result = await ContactInfo.findAll();
      return new CustomResult(StatusCode.Success, result);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },

  findOne: async (id: string): Promise<CustomResult<ContactInfo>> => {
    try {
      const foundContactInfo = await ContactInfo.findByPk(id);

      if (foundContactInfo) {
        return new CustomResult(StatusCode.Success, foundContactInfo);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },

  create: async (body: any): Promise<CustomResult<ContactInfo>> => {
    const info = ContactInfo.build(body);

    try {
      const savedContactInfo = await info.save();
      return new CustomResult(StatusCode.Created, savedContactInfo);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },

  update: async (id: string, body: any): Promise<CustomResult<ContactInfo>> => {
    try {
      const contactInfoToEdit = await ContactInfo.findByPk(id);
      if (contactInfoToEdit) {
        const result = await contactInfoToEdit.update(body);
        return new CustomResult(StatusCode.Success, result);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },

  delete: async (id: string): Promise<CustomResult<ContactInfo>> => {
    try {
      const contactInfoToDelete = await ContactInfo.findByPk(id);
      if (contactInfoToDelete) {
        await contactInfoToDelete.destroy();
        return new CustomResult(StatusCode.NoContent);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },
};
