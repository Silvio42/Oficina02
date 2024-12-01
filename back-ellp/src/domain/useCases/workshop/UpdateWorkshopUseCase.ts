import { inject, injectable } from "tsyringe";

import * as UpdateWorkshopData from "@domain/data/workshop/IUpdateWorkshopData";
import { WorkshopRepository } from "../../../infra/repositories/mongo/workshop/WorkshopRepository";

@injectable()
export class UpdateWorkshopUseCase {
  constructor(
    @inject("WorkshopRepository")
    private workshopRepository: WorkshopRepository
  ) {}

  execute(
    params: UpdateWorkshopData.Params
  ): Promise<UpdateWorkshopData.Response> {
    return this.workshopRepository.update(params);
  }
}
