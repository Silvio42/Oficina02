import { inject, injectable } from "tsyringe";

import * as CreateUserData from "../../../domain/data/users/ICreateUserData";
import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(params: CreateUserData.Params): Promise<CreateUserData.Response> {
    const { email, password, dateOfBirth } = params;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("E-mail inválido");
    }

    if (!password || password.length < 6) {
      throw new Error("A senha deve conter pelo menos 6 caracteres");
    }

    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      throw new Error("Data de nascimento inválida");
    }
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      throw new Error("Usuário deve ter pelo menos 18 anos");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuário já existe com este e-mail");
    }

    return this.userRepository.create(params);
  }
}
