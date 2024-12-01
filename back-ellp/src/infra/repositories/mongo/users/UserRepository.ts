import * as CreateUserData from "../../../../domain/data/users/ICreateUserData";
import * as LoginUserData from "../../../../domain/data/users/ILoginUserData";
import * as FindByIdUserData from "../../../../domain/data/users/IFindByIdUserData";
import { UserMappers } from "./UserMappers";
import { UserModel } from "./UserModel";
import bcrypt from "bcrypt";

export class UserRepository
  implements CreateUserData.ICreateUserData, FindByIdUserData.IFindByIdUserData, LoginUserData.ILoginUserData {
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

  async login(params: LoginUserData.Params): Promise<LoginUserData.Response> {
    const { email, password } = params;

    const objectData = await UserModel.findOne({ email }).lean();
    
    if (!objectData) return null;

    const isPasswordValid = password == objectData.password;
    if (!isPasswordValid) return null;

    return UserMappers.toEntity(objectData);
  }
}
