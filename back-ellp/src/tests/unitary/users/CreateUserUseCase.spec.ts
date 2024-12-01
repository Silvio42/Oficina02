import "reflect-metadata";
import { expect, test, describe, vitest, beforeAll } from "vitest";

import { CreateUserUseCase } from "../../../domain/useCases/users/CreateUserUseCase";
import { UserRepositoryMock } from "../../mocks/UserRepositoryMock";
import { UserEntity } from "@domain/entities/UserEntity";
import { UserRepository } from "@infra/repositories/mongo/users/UserRepository";

let fakerUserRepository: UserRepositoryMock;
let createUserUseCase: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeAll(() => {
    vitest.clearAllMocks();
    fakerUserRepository = new UserRepositoryMock();
    createUserUseCase = new CreateUserUseCase(
      fakerUserRepository as UserRepository
    );
  });

  test("Should be able to call use case and create user", async () => {
    const execution = vitest.spyOn(createUserUseCase, "execute");
    const mockUserData: UserEntity = {
      email: "user@utfpr.com",
      password: "1234",
      dateOfBirth: "11/11/2011",
      id: "123",
    };

    const user = await createUserUseCase.execute(mockUserData);

    expect(execution).toHaveBeenCalledTimes(1);
    expect(user).toStrictEqual(mockUserData);
  });
});
