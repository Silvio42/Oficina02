import { inject, injectable } from "tsyringe";
import { Params, Response } from "../../../domain/data/users/ILoginUserData";
import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  execute(params: Params): Promise<Response> {
    return this.userRepository.login(params);
  }
}