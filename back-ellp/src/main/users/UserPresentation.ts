import { UserRepository } from "../../infra/repositories/mongo/users/UserRepository";
import * as FindByIdUserData from "../../domain/data/users/IFindByIdUserData";

export class UserPresentation {
  userRepository = new UserRepository();

  findById(
    params: FindByIdUserData.Params
  ): Promise<FindByIdUserData.Response> {
    return this.userRepository.findById(params);
  }
}
