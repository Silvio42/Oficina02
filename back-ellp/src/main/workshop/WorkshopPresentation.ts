import * as FindByIdWorkshopData from "../../domain/data/workshop/IFindByIdWorkshopData";
import * as FindAllWorkshopsData from "../../domain/data/workshop/IFindAllWorkshopsData";
import { WorkshopRepository } from "../../infra/repositories/mongo/workshop/WorkshopRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class WorkshopPresentation {
  constructor(
    @inject("WorkshopRepository")
    private workshopRepository: WorkshopRepository
  ) {}

  findById(
    params: FindByIdWorkshopData.Params
  ): Promise<FindByIdWorkshopData.Response> {
    return this.workshopRepository.findById(params);
  }

  findAll({
    filters,
    term,
  }: FindAllWorkshopsData.Params): Promise<FindAllWorkshopsData.Response> {
    return this.workshopRepository.findAll({
      filters: {
        ...filters,
        ...(term && { name: RegExp(".*" + term + ".*", "i") }),
      },
    });
  }
}
