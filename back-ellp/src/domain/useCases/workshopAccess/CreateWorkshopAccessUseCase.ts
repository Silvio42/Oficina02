import { inject, injectable } from "tsyringe";

import * as CreateWorkshopAccessData from "@domain/data/workshopAccess/ICreateWorkshopAccessData";
import { WorkshopAccessRepository } from "../../../infra/repositories/mongo/workshopAccess/WorkshopAccessRepository";

@injectable()
export class CreateWorkshopAccessUseCase {
  constructor(
    @inject("WorkshopAccessRepository")
    private workshopAccessRepository: WorkshopAccessRepository
  ) {}

  execute(
    params: CreateWorkshopAccessData.Params
  ): Promise<CreateWorkshopAccessData.Response> {
    return this.workshopAccessRepository.create(params);
  }
}
