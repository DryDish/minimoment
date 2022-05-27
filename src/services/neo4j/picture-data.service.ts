import Neode, { Node } from "neode";
import { PictureData } from "../../models/neo4j/picture-data";
import { User } from "../../models/neo4j/user";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";

export class PictureDataService extends GenericService<typeof PictureData> {
  userService = new GenericService(User);
  constructor(protected model: typeof PictureData) {
    super(model);
  }

  async findAll(): Promise<CustomResult<typeof PictureData[]>> {
      return new CustomResult(StatusCode.Forbidden)
  }

  async create(body: any): Promise<CustomResult<typeof PictureData>> {
    try {
      const userObject = await this.userService.findOne(body.user_id);

      const pictureData = (await this.model.create(body));

      pictureData.relateTo(userObject.entity as Node<any>, "has_pictures");

      return new CustomResult(StatusCode.Created, pictureData.properties() as typeof PictureData);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async findByUserId(userId: string): Promise<CustomResult<typeof PictureData[]>> {
    try {
      const queryBuilder = this.model.query();

      const idk = await queryBuilder.match("p", PictureData)
        .where("p.user_id", userId)
        .return("p")
        .execute();

      if (idk.records) {
        console.log("i think there are no records");
        console.log(idk.summary);
        return new CustomResult(StatusCode.NotFound);
      }
      console.log(idk);

      return new CustomResult(StatusCode.Success, idk.records);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

}