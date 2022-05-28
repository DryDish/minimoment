import { User } from "../../models/neo4j/user";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { Role } from "../../models/neo4j/role";
import { ContactInfo } from "../../models/neo4j/contact-info";

export class UserService extends GenericService<typeof User> {
  constructor(protected model: typeof User) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof User>> {
    try {
      const role = await Role.find(body.role_id);
      if (!role) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const contactInfo = await ContactInfo.find(body.contact_info_id);
      if (!contactInfo) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const user = await this.model.create(body);

      user.relateTo(role, "has_role");
      user.relateTo(contactInfo, "has_contact_info");

      return new CustomResult(
        StatusCode.Created,
        user.properties() as typeof User
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof User>> {
    if (isValidNeoId(id)) {
      try {
        const userToEdit = await this.model.find(id);

        if (userToEdit) {
          const role = await Role.find(body.role_id);
          if (!role) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const contactInfo = await ContactInfo.find(body.contact_info_id);
          if (!contactInfo) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const user = await userToEdit.update(body);

          user.relateTo(role, "has_role");
          user.relateTo(contactInfo, "has_contact_info");

          return new CustomResult(
            StatusCode.Created,
            user.properties() as typeof User
          );
        } else {
          return new CustomResult(StatusCode.NotFound);
        }
      } catch (error) {
        console.error(error);
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      console.log("Invalid id");
      return new CustomResult(StatusCode.BadRequest);
    }
  }
}
