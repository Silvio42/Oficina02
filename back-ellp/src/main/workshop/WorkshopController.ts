import { Request, Response } from "express";
import { container } from "tsyringe";

import { WorkshopPresentation } from "./WorkshopPresentation";
import { DeleteWorkshopUseCase } from "../../domain/useCases/workshop/DeleteWorkshopUseCase";
import { CreateWorkshopUseCase } from "../../domain/useCases/workshop/CreateWorkshopUseCase";
import { UpdateWorkshopUseCase } from "../../domain/useCases/workshop/UpdateWorkshopUseCase";

export class WorkshopController {
  async create(request: Request, response: Response): Promise<any> {
    const workshop = await container
      .resolve(CreateWorkshopUseCase)
      .execute(request?.body);

    return response.json(workshop);
  }

  async update(request: Request, response: Response): Promise<any> {
    const workshop = await container
      .resolve(UpdateWorkshopUseCase)
      .execute({ id: request.params.id, data: request?.body });

    return response.json(workshop);
  }

  async delete(request: Request, response: Response): Promise<any> {
    const workshop = await container
      .resolve(DeleteWorkshopUseCase)
      .execute({ id: request.params?.id });

    return response.json(workshop);
  }

  async findById(request: Request, response: Response): Promise<any> {
    const workshop = await container.resolve(WorkshopPresentation).findById({
      id: request.params?.id,
    });

    return response.json(workshop);
  }

  async findAll(request: Request, response: Response): Promise<any> {
    const term = request.query?.term;

    const workshop = await container.resolve(WorkshopPresentation).findAll({
      filters: request.params,
      term: term && String(term),
    });

    return response.json(workshop);
  }
}
