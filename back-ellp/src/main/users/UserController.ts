import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "../../domain/useCases/users/CreateUserUseCase";
import { UserPresentation } from "./UserPresentation";
import { LoginUserUseCase } from "../../domain/useCases/users/LoginUserUseCase";

export class UserController {
  async register(request: Request, response: Response): Promise<any> {
    const user = await container
      .resolve(CreateUserUseCase)
      .execute(request?.body);

    return response.json(user);
  }

  async login(request: Request, response: Response): Promise<any> {
    const user = await container
      .resolve(LoginUserUseCase)
      .execute(request?.body);

    if (!user)
      return response.status(400).json({ error: "O usuário ou a senha informados estão incorretos!" });

    return response.json(user);
  }

  async findById(request: Request, response: Response): Promise<any> {
    const user = await new UserPresentation().findById({
      id: request.params?.id,
    });

    return response.json(user);
  }
}
