import { inject, injectable } from "tsyringe";

import * as CreateVolunteersData from "@domain/data/volunteers/ICreateVolunteersData";
import { VolunteersRepository } from "../../../infra/repositories/mongo/volunteers/VolunteersRepository";

@injectable()
export class CreateVolunteerUseCase {
  constructor(
    @inject("VolunteersRepository")
    private volunteersRepository: VolunteersRepository
  ) {}

  execute(
    params: CreateVolunteersData.Params
  ): Promise<CreateVolunteersData.Response> {
    return this.volunteersRepository.create(params);
  }
}
