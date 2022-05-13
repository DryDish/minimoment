import { CustomResult, StatusCode } from "../../utils/custom-result.utils";

export class GenericService<T> {
  constructor(protected model: any) {}

  async findAll(): Promise<CustomResult<T[]>> {
    try {
      const foundModelList = await this.model.findAll();
      return new CustomResult(StatusCode.Success, foundModelList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async findOne(id: string): Promise<CustomResult<T>> {
    try {
      const foundModel = await this.model.findByPk(id);

      if (foundModel) {
        return new CustomResult(StatusCode.Success, foundModel);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async create(body: any): Promise<CustomResult<T>> {
    const info = this.model.build(body);

    try {
      const savedModel = await info.save();
      return new CustomResult(StatusCode.Created, savedModel);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<T>> {
    try {
      const modelToEdit = await this.model.findByPk(id);
      if (modelToEdit) {
        const result = await modelToEdit.update(body);
        return new CustomResult(StatusCode.Success, result);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async delete(id: string): Promise<CustomResult<T>> {
    try {
      const modelToDelete = await this.model.findByPk(id);
      if (modelToDelete) {
        await modelToDelete.destroy();
        return new CustomResult(StatusCode.NoContent);
      } else {
        return new CustomResult(StatusCode.NotFound);
      }
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }
}
