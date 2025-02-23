import * as CreateUserData from "../../../domain/data/users/ICreateUserData";
import * as LoginUserData from "../../../domain/data/users/ILoginUserData";
import * as FindByIdUserData from "../../../domain/data/users/IFindByIdUserData";
import * as FindByEmailUserData from "../../../domain/data/users/IFindByEmailUserData";

export class UserRepositoryMock
  implements
    CreateUserData.ICreateUserData,
    LoginUserData.ILoginUserData,
    FindByIdUserData.IFindByIdUserData,
    FindByEmailUserData.IFindByEmailUserData
{
  async findByEmail(
    params: FindByEmailUserData.Params
  ): Promise<FindByEmailUserData.Response> {
    if (params.email === "usasder@utfpr.com") {
      return {
        email: "user@utfpr.com",
        password: "senha123",
        dateOfBirth: "11/11/2011",
        id: "123",
      };
    }
    return null;
  }

  async create(
    params: CreateUserData.Params
  ): Promise<CreateUserData.Response> {
    return { ...params, id: "123" };
  }

  async login(params: LoginUserData.Params): Promise<LoginUserData.Response> {
    return { ...params, id: "123", dateOfBirth: "11/11/2011" };
  }

  async findById(
    params: FindByIdUserData.Params
  ): Promise<FindByIdUserData.Response> {
    if (params.id === "123") {
      return {
        email: "user@utfpr.com",
        password: "senha123",
        dateOfBirth: "11/11/2011",
        id: "123",
      };
    }
    return null;
  }
}
