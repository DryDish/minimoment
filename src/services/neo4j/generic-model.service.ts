import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import Neode from "neode";
import { isValidNeoId } from "../../utils/neo-validator";

export class GenericService<T> {
  constructor(protected model: Neode.Model<unknown>) {}

  async findAll(): Promise<CustomResult<T[]>> {
    try {
      const foundModelList = (await this.model.all()).map((node) =>
        node.properties()
      );
      return new CustomResult(StatusCode.Success, foundModelList);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async findOne(id: string): Promise<CustomResult<T>> {
    if (isValidNeoId(id)) {
      try {
        const foundModel = (await this.model.find(id));

        if (foundModel) {
          return new CustomResult(StatusCode.Success, foundModel.properties() as T);
        } else {
          return new CustomResult(StatusCode.NotFound);
        }
      } catch (error) {
        console.error(error);
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      return new CustomResult(StatusCode.BadRequest);
    }
  }

  async create(body: any): Promise<CustomResult<T>> {
    try {
      const info = (await this.model.create(body));
      return new CustomResult(StatusCode.Created, info.properties() as T);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<T>> {
    if (isValidNeoId(id)) {
      try {
        const modelToEdit = await this.model.find(id);

        if (modelToEdit) {
          const result = (await modelToEdit.update(body)).properties() as T;
          return new CustomResult(StatusCode.Success, result);
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

  async delete(id: string): Promise<CustomResult<T>> {
    if (isValidNeoId(id)) {
      try {
        const modelToDelete = await this.model.find(id);
        if (modelToDelete) {
          await modelToDelete.delete();
          return new CustomResult(StatusCode.NoContent);
        } else {
          return new CustomResult(StatusCode.NotFound);
        }
      } catch (error) {
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      return new CustomResult(StatusCode.BadRequest);
    }
  }
}
