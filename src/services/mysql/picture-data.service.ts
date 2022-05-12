import { PictureData } from "../../models/mysql/picture-data";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";

export class PictureDataService extends GenericService<PictureData> {
  constructor(protected model: any) {
    super(model);
  }
  
  async findAll(): Promise<CustomResult<PictureData[]>> {
      return new CustomResult(StatusCode.Forbidden)
  }

  async findByUserId(userId: string): Promise<CustomResult<PictureData[]>> {
    try {
      const orderList = await PictureData.findAll({
        where: { userId },
      });
      return new CustomResult(StatusCode.Success, orderList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }
}