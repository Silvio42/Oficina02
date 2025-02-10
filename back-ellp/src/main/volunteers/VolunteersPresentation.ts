import { inject, injectable } from "tsyringe";

import * as FindAllVolunteersData from "../../domain/data/volunteers/IFindAllVolunteersData";
import { VolunteersRepository } from "../../infra/repositories/mongo/volunteers/VolunteersRepository";

@injectable()
export class VolunteersPresentation {
  constructor(
    @inject("VolunteersRepository")
    private volunteersRepository: VolunteersRepository
  ) {}

  findAll(
    params: FindAllVolunteersData.Params
  ): Promise<FindAllVolunteersData.Response> {
    return this.volunteersRepository.findAll(params);
  }
}
