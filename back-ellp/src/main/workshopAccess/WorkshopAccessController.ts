import { Request, Response } from "express";
import { container } from "tsyringe";

import { WorkshopAccessPresentation } from "./WorkshopAccessPresentation";
import { CreateWorkshopAccessUseCase } from "../../domain/useCases/workshopAccess/CreateWorkshopAccessUseCase";

export class WorkshopAccessController {
  async create(request: Request, response: Response): Promise<any> {
    const workshopAccess = await container
      .resolve(CreateWorkshopAccessUseCase)
      .execute(request?.body);

    return response.status(200).json(workshopAccess);
  }

  async findById(request: Request, response: Response): Promise<any> {
    const { workshop, user } = request.query as {
      workshop: string;
      user: string;
    };
    const workshopAccess = await container
      .resolve(WorkshopAccessPresentation)
      .findById({ filters: { workshop, user } });

    return response.json(workshopAccess);
  }
}
