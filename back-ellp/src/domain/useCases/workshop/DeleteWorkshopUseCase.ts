import { inject, injectable } from "tsyringe";

import * as DeleteWorkshopData from "@domain/data/workshop/IDeleteWorkshopData ";
import { WorkshopRepository } from "../../../infra/repositories/mongo/workshop/WorkshopRepository";

@injectable()
export class DeleteWorkshopUseCase {
  constructor(
    @inject("WorkshopRepository")
    private workshopRepository: WorkshopRepository
  ) {}

  execute(
    params: DeleteWorkshopData.Params
  ): Promise<DeleteWorkshopData.Response> {
    return this.workshopRepository.delete(params);
  }
}
