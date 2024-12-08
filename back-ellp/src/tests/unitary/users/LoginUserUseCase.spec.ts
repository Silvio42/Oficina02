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

  test("Should be able to call use case and login user with valid credentials", async () => {
    const execution = vitest.spyOn(loginUserUseCase, "execute");
    const mockUserData: UserEntity = {
      email: "user@utfpr.com",
      password: "user123",
      dateOfBirth: "11/11/2011",
      id: "123",
    };

    const user = await loginUserUseCase.execute(mockUserData);

    expect(execution).toHaveBeenCalledTimes(1);
    expect(user).toStrictEqual(mockUserData);
  });

  test("Should not login if user does not exist", async () => {
    vitest.spyOn(fakerUserRepository, "login").mockResolvedValueOnce(null);
    const mockUserData: UserEntity = {
      email: "nonexistent@utfpr.com",
      password: "user123",
      dateOfBirth: "",
      id: "",
    };

    const user = await loginUserUseCase.execute(mockUserData);

    expect(user).toBeNull();
  });

  test("Should not login if password is invalid", async () => {
    vitest.spyOn(fakerUserRepository, "login").mockResolvedValueOnce(null);
    const mockUserData: UserEntity = {
      email: "user@utfpr.com",
      password: "wrongpassword",
      dateOfBirth: "11/11/2011",
      id: "123",
    };

    const user = await loginUserUseCase.execute(mockUserData);

    expect(user).toBeNull();
  });

  test("Should login if password is valid and user exists", async () => {
    const mockUserData: UserEntity = {
      email: "user@utfpr.com",
      password: "user123",
      dateOfBirth: "11/11/2011",
      id: "123",
    };

    vitest.spyOn(fakerUserRepository, "login").mockResolvedValueOnce(mockUserData);

    const user = await loginUserUseCase.execute(mockUserData);

    expect(user).toStrictEqual(mockUserData);
  });
});