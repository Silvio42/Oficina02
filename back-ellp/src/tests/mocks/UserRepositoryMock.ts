import * as CreateUserData from "../../domain/data/users/ICreateUserData";
import * as FindByIdUserData from "../../domain/data/users/IFindByIdUserData";

export class UserRepositoryMock
  implements CreateUserData.ICreateUserData, FindByIdUserData.IFindByIdUserData
{
  async create(
    params: CreateUserData.Params
  ): Promise<CreateUserData.Response> {
    return { ...params, id: "123" };
  }

  findById(
    params: FindByIdUserData.Params
  ): Promise<FindByIdUserData.Response> {
    return {} as any;
  }
}
