import "reflect-metadata";
import { expect, test, describe, vitest, beforeAll } from "vitest";

import { LoginUserUseCase } from "../../../domain/useCases/users/LoginUserUseCase";
import { UserRepositoryMock } from "../../mocks/repositories/UserRepositoryMock";
import { UserEntity } from "@domain/entities/UserEntity";
import { UserRepository } from "@infra/repositories/mongo/users/UserRepository";

let fakerUserRepository: UserRepositoryMock;
let loginUserUseCase: LoginUserUseCase;

describe("Login User Use Case", () => {
  beforeAll(() => {
    vitest.clearAllMocks();
    fakerUserRepository = new UserRepositoryMock();
    loginUserUseCase = new LoginUserUseCase(
      fakerUserRepository as UserRepository
    );
  });

  test("Should be able to call use case and login user", async () => {
    const execution = vitest.spyOn(loginUserUseCase, "execute");
    const mockUserData: UserEntity = {
      username: "User",
      password: "user@utfpr.com",
      role: "admin",
      dateOfBirth: "11/11/2011",
      id: "123",
    };

    const user = await loginUserUseCase.execute(mockUserData);

    expect(execution).toHaveBeenCalledTimes(1);
    expect(user).toStrictEqual(mockUserData);
  });
});
