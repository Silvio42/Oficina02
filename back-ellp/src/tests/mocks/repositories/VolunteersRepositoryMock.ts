import { inject, injectable } from "tsyringe";

import * as CreateVolunteersData from "../../../domain/data/volunteers/ICreateVolunteersData";
import * as FindAllVolunteersData from "../../../domain/data/volunteers/IFindAllVolunteersData";
import { VolunteerEntity } from "@domain/entities/VolunteerEntity";
import { volunteerMock } from "../data/volunteerMock";

export class VolunteersRepositoryMock
  implements
    CreateVolunteersData.ICreateVolunteersData,
    FindAllVolunteersData.IFindAllVolunteersData
{
  volunteersMock = [volunteerMock];

  async create(
    params: CreateVolunteersData.Params
  ): Promise<CreateVolunteersData.Response> {
    this.volunteersMock.push(params as VolunteerEntity);
  }

  async findAll({
    filters: { workshop },
  }: FindAllVolunteersData.Params): Promise<FindAllVolunteersData.Response> {
    return this.volunteersMock.filter(
      (volunteerMockData) => volunteerMockData.workshop === workshop
    );
  }
}

@injectable()
export class VolunteersRepositorySingletonMock {
  volunteersRepositoryMock: VolunteersRepositoryMock;
  constructor(
    @inject("VolunteersRepository")
    volunteersRepositoryMock: VolunteersRepositoryMock
  ) {
    this.volunteersRepositoryMock = volunteersRepositoryMock;
  }
}
