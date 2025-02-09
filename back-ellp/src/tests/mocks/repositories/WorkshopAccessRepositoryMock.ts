import { inject, injectable } from "tsyringe";

import * as CreateWorkshopAccessData from "../../../domain/data/workshopAccess/ICreateWorkshopAccessData";
import * as FindByIdWorkshopAccessData from "../../../domain/data/workshopAccess/IFindByIdWorkshopAccessData";
import { workshopAccessMock } from "../data/workshopAccessMock";
import { WorkshopAccessEntity } from "@domain/entities/WorkshopAccessEntity";

export class WorkshopAccessRepositoryMock
  implements
    CreateWorkshopAccessData.ICreateWorkshopAccessData,
    FindByIdWorkshopAccessData.IFindByIdWorkshopAccessData
{
  workshopAccessList = [workshopAccessMock];

  async create(
    params: CreateWorkshopAccessData.Params
  ): Promise<CreateWorkshopAccessData.Response> {
    this.workshopAccessList.push(params as WorkshopAccessEntity);
  }

  async findById({
    filters: { workshop, user },
  }: FindByIdWorkshopAccessData.Params): Promise<FindByIdWorkshopAccessData.Response> {
    return this.workshopAccessList.find(
      (workshopAccess) =>
        workshopAccess.workshop === workshop && workshopAccess.user === user
    );
  }
}

@injectable()
export class WorkshopAccessRepositorySingletonMock {
  workshopAccessRepositoryMock: WorkshopAccessRepositoryMock;
  constructor(
    @inject("WorkshopAccessRepository")
    workshopAccessRepositoryMock: WorkshopAccessRepositoryMock
  ) {
    this.workshopAccessRepositoryMock = workshopAccessRepositoryMock;
  }
}
