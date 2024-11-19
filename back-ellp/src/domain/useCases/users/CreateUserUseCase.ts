import { inject, injectable } from "tsyringe";

import * as CreateUserData from "../../../domain/data/users/ICreateUserData";
import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  execute(params: CreateUserData.Params): Promise<CreateUserData.Response> {
    return this.userRepository.create(params);
  }
}
