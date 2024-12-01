import * as CreateUserData from "../../../domain/data/users/ICreateUserData";
import * as LoginUserData from "../../../domain/data/users/ILoginUserData";
import * as FindByIdUserData from "../../../domain/data/users/IFindByIdUserData";

export class UserRepositoryMock
  implements
    CreateUserData.ICreateUserData,
    LoginUserData.ILoginUserData,
    FindByIdUserData.IFindByIdUserData
{
  async create(
    params: CreateUserData.Params
  ): Promise<CreateUserData.Response> {
    return { ...params, id: "123" };
  }

  async login(params: LoginUserData.Params): Promise<LoginUserData.Response> {
    return { ...params, id: "123", dateOfBirth: "11/11/2011", role: "admin" };
  }

  findById(
    params: FindByIdUserData.Params
  ): Promise<FindByIdUserData.Response> {
    return {} as any;
  }
}
