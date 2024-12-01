import { container } from "tsyringe";

import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";
import { UserRepositoryMock } from "../../../tests/mocks/UserRepositoryMock";
import { WorkshopRepository } from "./workshop/WorkshopRepository";

container.registerSingleton(
  "UserRepository",
  process.env.NODE_ENV !== "test" ? UserRepository : UserRepositoryMock
);

container.registerSingleton(
  "WorkshopRepository",
  process.env.NODE_ENV !== "test" ? WorkshopRepository : WorkshopRepository
);
