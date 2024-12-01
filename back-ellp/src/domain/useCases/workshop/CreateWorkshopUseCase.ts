import { inject, injectable } from "tsyringe";

import * as CreateWorkshopData from "@domain/data/workshop/ICreateWorkshopData";
import { WorkshopRepository } from "../../../infra/repositories/mongo/workshop/WorkshopRepository";

@injectable()
export class CreateWorkshopUseCase {
  constructor(
    @inject("WorkshopRepository")
    private workshopRepository: WorkshopRepository
  ) {}

  execute(
    params: CreateWorkshopData.Params
  ): Promise<CreateWorkshopData.Response> {
    return this.workshopRepository.create(params);
  }
}
