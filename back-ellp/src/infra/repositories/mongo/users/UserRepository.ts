import * as CreateUserData from "../../../../domain/data/users/ICreateUserData";
import * as FindByIdUserData from "../../../../domain/data/users/IFindByIdUserData";
import { UserMappers } from "./UserMappers";
import { UserModel } from "./UserModel";

export class UserRepository
  implements CreateUserData.ICreateUserData, FindByIdUserData.IFindByIdUserData
{
  userModel = UserModel;

  async findById({
    id,
  }: FindByIdUserData.Params): Promise<FindByIdUserData.Response> {
    const objectData = await UserModel.findOne({ _id: id }).lean();
    return UserMappers.toEntity(objectData);
  }

  async create(
    params: CreateUserData.Params
  ): Promise<CreateUserData.Response> {
    const objectData = await this.userModel.create(params);
    return UserMappers.toEntity(objectData);
  }
}
