import { Request, Response } from "express";
import { container } from "tsyringe";

import { VolunteersPresentation } from "./VolunteersPresentation";
import { CreateVolunteerUseCase } from "../../domain/useCases/volunteers/CreateVolunteerUseCase";

export class VolunteersController {
  async create(request: Request, response: Response): Promise<any> {
    await container.resolve(CreateVolunteerUseCase).execute(request?.body);

    return response
      .status(201)
      .json({ message: "Voluntário cadastrado com sucesso!" });
  }

  async findAll(request: Request, response: Response): Promise<any> {
    const { workshop } = request.query;

    const volunteers = await container.resolve(VolunteersPresentation).findAll({
      filters: { workshop: String(workshop) },
    });

    return response.json(volunteers);
  }
}
