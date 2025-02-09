import { Request, Response } from "express";
import { container } from "tsyringe";

import { StudentsPresentation } from "./StudentsPresentation";
import { DeleteStudentUseCase } from "../../domain/useCases/students/DeleteStudentUseCase";
import { CreateStudentUseCase } from "../../domain/useCases/students/CreateStudentUseCase";
import { UpdateStudentUseCase } from "../../domain/useCases/students/UpdateStudentUseCase";

export class StudentsController {
  async create(request: Request, response: Response): Promise<any> {
    const student = await container
      .resolve(CreateStudentUseCase)
      .execute(request?.body);

    return response.status(201).json(student);
  }

  async update(request: Request, response: Response): Promise<any> {
    const student = await container
      .resolve(UpdateStudentUseCase)
      .execute({ id: request.params.id, data: request?.body });

    return response.json(student);
  }

  async delete(request: Request, response: Response): Promise<any> {
    const student = await container
      .resolve(DeleteStudentUseCase)
      .execute({ id: request.params?.id });

    return response.json(student);
  }

  async findById(request: Request, response: Response): Promise<any> {
    const student = await container.resolve(StudentsPresentation).findById({
      id: request.params?.id,
    });

    return response.json(student);
  }

  async findAll(request: Request, response: Response): Promise<any> {
    const term = request.query?.term;

    const students = await container.resolve(StudentsPresentation).findAll({
      filters: request.query,
      term: term && String(term),
    });

    return response.json(students);
  }
}
