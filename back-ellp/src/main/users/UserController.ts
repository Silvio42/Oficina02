import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "../../domain/useCases/users/CreateUserUseCase";
import { UserPresentation } from "./UserPresentation";

export class UserController {
  async register(request: Request, response: Response): Promise<any> {
    const user = await container
      .resolve(CreateUserUseCase)
      .execute(request?.body);

    return response.json(user);
  }

  async findById(request: Request, response: Response): Promise<any> {
    const user = await new UserPresentation().findById({
      id: request.params?.id,
    });

    return response.json(user);
  }
}
