import { OrderItem } from "../../models/neo4j/order-item";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { instance } from "../../config/neo4j.config";
import { PictureData } from "../../models/neo4j/picture-data";
import { PaperType } from "../../models/neo4j/paper-type";
import { Frame } from "../../models/neo4j/frame";
import { Order } from "../../models/neo4j/order";

export class OrderItemService extends GenericService<typeof OrderItem> {
  constructor(protected model: typeof OrderItem) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof OrderItem>> {
    try {
      const pictureDataObject = await PictureData.find(body.picture_data_id);
      if (!pictureDataObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const paperTypeObject = await PaperType.find(body.paper_type_id);
      if (!paperTypeObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const frameObject = await Frame.find(body.frame_id);
      if (!frameObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const orderObject = await Order.find(body.order_id);
      if (!orderObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const orderItem = await this.model.create(body);

      orderItem.relateTo(pictureDataObject, "has_picture");
      orderItem.relateTo(paperTypeObject, "has_paper");
      orderItem.relateTo(frameObject, "has_frame");
      orderItem.relateTo(orderObject, "has_item");

      return new CustomResult(
        StatusCode.Created,
        orderItem.properties() as typeof OrderItem
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof OrderItem>> {
    if (isValidNeoId(id)) {
      try {
        const orderItemToEdit = await this.model.find(id);

        if (orderItemToEdit) {
          const pictureDataObject = await PictureData.find(
            body.picture_data_id
          );
          if (!pictureDataObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const paperTypeObject = await PaperType.find(body.paper_type_id);
          if (!paperTypeObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const frameObject = await Frame.find(body.frame_id);
          if (!frameObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const orderObject = await Order.find(body.order_id);
          if (!orderObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const orderItem = await orderItemToEdit.update(body);

          orderItem.relateTo(pictureDataObject, "has_picture");
          orderItem.relateTo(paperTypeObject, "has_paper");
          orderItem.relateTo(frameObject, "has_frame");
          orderItem.relateTo(orderObject, "has_item");

          return new CustomResult(
            StatusCode.Created,
            orderItem.properties() as typeof OrderItem
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

  async findByUserId(
    userId: string
  ): Promise<CustomResult<typeof OrderItem[]>> {
    if (isValidNeoId(userId)) {
      try {
        const queryResult = await instance.cypher(
          "MATCH (o: Order_Item)<-[:HAS_ITEM]-()<-[:HAS_ORDER]-(u: User {user_id: $user_id}) RETURN o;",
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

  async findByOrderId(
    orderId: string
  ): Promise<CustomResult<typeof OrderItem[]>> {
    if (isValidNeoId(orderId)) {
      try {
        const queryResult = await instance.cypher(
          "MATCH (o: Order_Item)<-[:HAS_ITEM]-(u: Order {order_id: $order_id}) RETURN o;",
          { order_id: orderId }
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
