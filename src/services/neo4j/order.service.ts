import { User } from "../../models/neo4j/user";
import { Order } from "../../models/neo4j/order";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { instance } from "../../config/neo4j.config";
import { DiscountCode } from "../../models/neo4j/discount-code";
import { ContactInfo } from "../../models/neo4j/contact-info";
import { Status } from "../../models/neo4j/status";

export class OrderService extends GenericService<typeof Order> {
  constructor(protected model: typeof Order) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof Order>> {
    try {
      const discountCodeObject = await DiscountCode.find(body.discount_code_id);
      if (!discountCodeObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const userObject = await User.find(body.user_id);
      if (!userObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const contactInfoObject = await ContactInfo.find(
        body.billing_contact_info_id
      );
      if (!contactInfoObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const statusObject = await Status.find(body.status_id);
      if (!statusObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const order = await this.model.create(body);

      order.relateTo(discountCodeObject, "has_discount");
      order.relateTo(userObject, "has_order");
      order.relateTo(contactInfoObject, "has_billing_info");
      order.relateTo(statusObject, "has_status");

      return new CustomResult(
        StatusCode.Created,
        order.properties() as typeof Order
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof Order>> {
    if (isValidNeoId(id)) {
      try {
        const orderToEdit = await this.model.find(id);

        if (orderToEdit) {
          const discountCodeObject = await DiscountCode.find(
            body.discount_code_id
          );
          if (!discountCodeObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const userObject = await User.find(body.user_id);
          if (!userObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const contactInfoObject = await ContactInfo.find(
            body.billing_contact_info_id
          );
          if (!contactInfoObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const statusObject = await Status.find(body.status_id);
          if (!statusObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const order = await orderToEdit.update(body);

          order.relateTo(discountCodeObject, "has_discount");
          order.relateTo(userObject, "has_order");
          order.relateTo(contactInfoObject, "has_billing_info");
          order.relateTo(statusObject, "has_status");

          return new CustomResult(
            StatusCode.Created,
            order.properties() as typeof Order
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

  async findByUserId(userId: string): Promise<CustomResult<typeof Order[]>> {
    if (isValidNeoId(userId)) {
      try {
        const queryResult = await instance.cypher(
          "MATCH (o: Order)<-[:HAS_ORDER]-(u: User {user_id: $user_id}) RETURN o;",
          { user_id: userId }
        );

        const result = queryResult.records.map(
          (record) => record.get("o")["properties"]
        );

        return new CustomResult(StatusCode.Success, result);
      } catch (error) {
        console.log(error);
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      console.log("Invalid id");
      return new CustomResult(StatusCode.BadRequest);
    }
  }
}
