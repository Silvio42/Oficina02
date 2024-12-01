import { inject, injectable } from "tsyringe";

import * as CreateWorkshopData from "../../../domain/data/workshop/ICreateWorkshopData";
import * as DeleteWorkshopData from "../../../domain/data/workshop/IDeleteWorkshopData ";
import * as FindAllWorkshopsData from "../../../domain/data/workshop/IFindAllWorkshopsData";
import * as FindByIdWorkshopData from "../../../domain/data/workshop/IFindByIdWorkshopData";
import * as UpdateWorkshopData from "../../../domain/data/workshop/IUpdateWorkshopData";
import { workshopMock } from "../data/workshopMock";

export class WorkshopRepositoryMock
  implements
    CreateWorkshopData.ICreateWorkshopData,
    DeleteWorkshopData.IDeleteWorkshopData,
    FindAllWorkshopsData.IFindAllWorkshopsData,
    FindByIdWorkshopData.IFindByIdWorkshopData,
    UpdateWorkshopData.IUpdateWorkshopData
{
  workshopList = [workshopMock];

  async create(
    params: CreateWorkshopData.Params
  ): Promise<CreateWorkshopData.Response> {
    this.workshopList.push(params);
    return params;
  }

  async delete({
    id,
  }: DeleteWorkshopData.Params): Promise<DeleteWorkshopData.Response> {
    this.workshopList = this.workshopList.filter(
      (workshop) => workshop.id !== id
    );

    return workshopMock;
  }

  async findAll(
    _params: FindAllWorkshopsData.Params
  ): Promise<FindAllWorkshopsData.Response> {
    return this.workshopList;
  }

  async findById({
    id,
  }: FindByIdWorkshopData.Params): Promise<FindByIdWorkshopData.Response> {
    return (
      [workshopMock].find((workshop) => workshop.id === id) ||
      ({} as FindByIdWorkshopData.Response)
    );
  }

  async update({
    id,
    data,
  }: UpdateWorkshopData.Params): Promise<UpdateWorkshopData.Response> {
    const workshop = this.workshopList.find((workshop) => workshop.id === id);
    const newWorkshopData = { ...workshop, ...data };

    this.workshopList = this.workshopList.filter(
      (workshop) => workshop.id !== id
    );
    this.workshopList.push(newWorkshopData);

    return newWorkshopData;
  }
}

@injectable()
export class WorkshopRepositorySingletonMock {
  workshopRepositoryMock: WorkshopRepositoryMock;
  constructor(
    @inject("WorkshopRepository")
    workshopRepositoryMock: WorkshopRepositoryMock
  ) {
    this.workshopRepositoryMock = workshopRepositoryMock;
  }
}
