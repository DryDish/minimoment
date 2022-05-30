import { Frame } from "../../models/neo4j/frame";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { Size } from "../../models/neo4j/size";
import { DiscountCode } from "../../models/neo4j/discount-code";

export class FrameService extends GenericService<typeof Frame> {
  constructor(protected model: typeof Frame) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof Frame>> {
    try {
      const discountCode = await DiscountCode.find(body.discount_code_id);
      if (!discountCode) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const size = await Size.find(body.size_id);
      if (!size) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const frame = await this.model.create(body);

      frame.relateTo(discountCode, "has_discount");
      frame.relateTo(size, "has_size");

      return new CustomResult(
        StatusCode.Created,
        frame.properties() as typeof Frame
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof Frame>> {
    if (isValidNeoId(id)) {
      try {
        const frameToEdit = await this.model.find(id);

        if (frameToEdit) {
          const discountCode = await DiscountCode.find(body.discount_code_id);
          if (!discountCode) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const size = await Size.find(body.size_id);
          if (!size) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const frame = await frameToEdit.update(body);

          frame.relateTo(discountCode, "has_discount");
          frame.relateTo(size, "has_size");

          return new CustomResult(
            StatusCode.Created,
            frame.properties() as typeof Frame
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
