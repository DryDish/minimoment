import mongoose, { Types } from "mongoose";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";

// export interface MongoModel<T> {
//   find(): Query<any[], any, {}, T>;
//   findById(id: string): Query<any, any, {}, T>;
//   create(body: T): T;
//   updateOne(filter: { _id: string }, body: T): UpdateResponse;
//   deleteOne(filter: {_id: string}): DeleteResponse;
// }

interface UpdateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: boolean;
  upsertedCount: number;
  matchedCount: number;
}

interface DeleteResponse {
  acknowledged: boolean;
  deletedCount: number;
}

interface MongoId {
  _id: string;
}

export class GenericService<T> {
  constructor(protected model: mongoose.Model<T, {}, {}, {}>) {}

  async findAll(): Promise<CustomResult<T & MongoId[]>> {
    try {
      const foundModelList = await this.model.find();
      return new CustomResult(StatusCode.Success, foundModelList as any);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async findOne(id: string): Promise<CustomResult<T & MongoId>> {
    try {

      // TODO - clean up this nested try-catch
      try {
        if (id.length !== 24) {
          throw Error;
        }
        const _ = new Types.ObjectId(id);
      } catch (error) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const foundModel = await this.model.findById(id);

      if (foundModel) {
        return new CustomResult(StatusCode.Success, foundModel as any);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async create(body: T): Promise<CustomResult<T & MongoId>> {
    try {
      const savedModel = await this.model.create(body);
      return new CustomResult(StatusCode.Created, savedModel as any);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: T): Promise<CustomResult<UpdateResponse>> {
    try {
      const status = await this.model.updateOne({ _id: id }, body);

      switch (status.matchedCount) {
        case 1:
          return new CustomResult(
            StatusCode.Success,
            status as unknown as UpdateResponse
          );
        case 0:
          return new CustomResult(StatusCode.NotFound);
        default:
          return new CustomResult(StatusCode.ServerError);
      }
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async delete(id: string): Promise<CustomResult<DeleteResponse>> {
    try {
      const status = await this.model.deleteOne({ _id: id });

      switch (status.deletedCount) {
        case 1:
          return new CustomResult(StatusCode.NoContent);
        case 0:
          return new CustomResult(StatusCode.NotFound);
        default:
          return new CustomResult(StatusCode.ServerError);
      }
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }
}
