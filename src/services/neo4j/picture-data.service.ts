import { Node } from "neode";
import { instance } from "../../config/neo4j.config";
import { PictureData } from "../../models/neo4j/picture-data";
import { User } from "../../models/neo4j/user";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { isValidNeoId } from "../../utils/neo-validator";
import { GenericService } from "./generic-model.service";

export class PictureDataService extends GenericService<typeof PictureData> {
  constructor(protected model: typeof PictureData) {
    super(model);
  }

  async findAll(): Promise<CustomResult<typeof PictureData[]>> {
    return new CustomResult(StatusCode.Forbidden);
  }

  async create(body: any): Promise<CustomResult<typeof PictureData>> {
    try {
      const userObject = await User.find(body.user_id);
      if (!userObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const pictureData = await this.model.create(body);

      pictureData.relateTo(userObject, "has_picture");

      return new CustomResult(
        StatusCode.Created,
        pictureData.properties() as typeof PictureData
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(
    id: string,
    body: any
  ): Promise<CustomResult<typeof PictureData>> {
    if (isValidNeoId(id)) {
      try {
        const pictureDataToEdit = await this.model.find(id);

        if (pictureDataToEdit) {
          const userObject = await User.find(body.user_id);
          if (!userObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const pictureData = await pictureDataToEdit.update(body);

          pictureData.relateTo(userObject, "has_picture");

          return new CustomResult(
            StatusCode.Created,
            pictureData.properties() as typeof PictureData
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
  ): Promise<CustomResult<typeof PictureData[]>> {
    if (isValidNeoId(userId)) {
      try {
        const queryResult = await instance.cypher(
          "MATCH (p: Picture_Data)<-[:HAS_PICTURE]-(u: User {user_id: $user_id}) RETURN p;",
          { user_id: userId }
        );

        const result = queryResult.records.map(
          (record) => record.get("p")["properties"]
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
