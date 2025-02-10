import { container } from "tsyringe";

import { UserRepository } from "../../../infra/repositories/mongo/users/UserRepository";
import { WorkshopRepository } from "./workshop/WorkshopRepository";
import { UserRepositoryMock } from "../../../tests/mocks/repositories/UserRepositoryMock";
import { WorkshopRepositoryMock } from "../../../tests/mocks/repositories/WorkshopRepositoryMock";
import { StudentRepository } from "./students/StudentRepository";
import { StudentRepositoryMock } from "../../../tests/mocks/repositories/StudentRepositoryMock";
import { WorkshopAccessRepository } from "./workshopAccess/WorkshopAccessRepository";
import { WorkshopAccessRepositoryMock } from "../../../tests/mocks/repositories/WorkshopAccessRepositoryMock";
import { VolunteersRepository } from "./volunteers/VolunteersRepository";
import { VolunteersRepositoryMock } from "../../../tests/mocks/repositories/VolunteersRepositoryMock";

container.registerSingleton(
  "StudentRepository",
  process.env.NODE_ENV !== "test" ? StudentRepository : StudentRepositoryMock
);

container.registerSingleton(
  "UserRepository",
  process.env.NODE_ENV !== "test" ? UserRepository : UserRepositoryMock
);

container.registerSingleton(
  "WorkshopRepository",
  process.env.NODE_ENV !== "test" ? WorkshopRepository : WorkshopRepositoryMock
);

container.registerSingleton(
  "WorkshopAccessRepository",
  process.env.NODE_ENV !== "test"
    ? WorkshopAccessRepository
    : WorkshopAccessRepositoryMock
);

container.registerSingleton(
  "VolunteersRepository",
  process.env.NODE_ENV !== "test"
    ? VolunteersRepository
    : VolunteersRepositoryMock
);
