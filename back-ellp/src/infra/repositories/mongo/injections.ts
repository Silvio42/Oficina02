import { container } from "tsyringe";

import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";
import { UserRepositoryMock } from "../../../tests/mocks/UserRepositoryMock";

container.registerSingleton(
  "UserRepository",
  process.env.NODE_ENV !== "test" ? UserRepository : UserRepositoryMock
);
