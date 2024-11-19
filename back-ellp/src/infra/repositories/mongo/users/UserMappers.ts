import { IUserModel } from "./UserModel";
import { UserEntity } from "../../../../domain/entities/UserEntity";

export class UserMappers {
  static toEntity(objectData: IUserModel): UserEntity {
    const data = { ...objectData };
    delete objectData._id;

    return { id: data._id, ...objectData };
  }

  static toModel(objectData: UserEntity): IUserModel {
    const data = { ...objectData };
    delete objectData.id;

    return { _id: data.id, ...objectData };
  }

  static toEntities(arrayData: Array<IUserModel>): Array<UserEntity> {
    return arrayData.map(this.toEntity);
  }

  static toModels(arrayData: Array<UserEntity>): Array<IUserModel> {
    return arrayData.map(this.toModel);
  }
}
