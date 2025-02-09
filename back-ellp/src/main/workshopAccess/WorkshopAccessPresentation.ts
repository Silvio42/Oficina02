import { inject, injectable } from "tsyringe";

import * as FindByIdWorkshopAccessData from "../../domain/data/workshopAccess/IFindByIdWorkshopAccessData";
import { WorkshopAccessRepository } from "../../infra/repositories/mongo/workshopAccess/WorkshopAccessRepository";

@injectable()
export class WorkshopAccessPresentation {
  constructor(
    @inject("WorkshopAccessRepository")
    private workshopAccessRepository: WorkshopAccessRepository
  ) {}

  findById(
    params: FindByIdWorkshopAccessData.Params
  ): Promise<FindByIdWorkshopAccessData.Response> {
    return this.workshopAccessRepository.findById(params);
  }
}
