import { PaperType } from "../../models/neo4j/paper-type";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { Size } from "../../models/neo4j/size";
import { DiscountCode } from "../../models/neo4j/discount-code";

export class PaperTypeService extends GenericService<typeof PaperType> {
  constructor(protected model: typeof PaperType) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof PaperType>> {
    try {
      const discountCode = await DiscountCode.find(body.discount_code_id);
      if (!discountCode) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const size = await Size.find(body.size_id);
      if (!size) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const paperType = await this.model.create(body);

      paperType.relateTo(discountCode, "has_discount");
      paperType.relateTo(size, "has_size");

      return new CustomResult(
        StatusCode.Created,
        paperType.properties() as typeof PaperType
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof PaperType>> {
    if (isValidNeoId(id)) {
      try {
        const paperTypeToEdit = await this.model.find(id);

        if (paperTypeToEdit) {
          const discountCode = await DiscountCode.find(body.discount_code_id);
          if (!discountCode) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const size = await Size.find(body.size_id);
          if (!size) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const paperType = await paperTypeToEdit.update(body);

          paperType.relateTo(discountCode, "has_discount");
          paperType.relateTo(size, "has_size");

          return new CustomResult(
            StatusCode.Created,
            paperType.properties() as typeof PaperType
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
