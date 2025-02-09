import { inject, injectable } from "tsyringe";

import * as CreateStudentData from "@domain/data/students/ICreateStudentData";
import { StudentRepository } from "../../../infra/repositories/mongo/students/StudentRepository";

@injectable()
export class CreateStudentUseCase {
  constructor(
    @inject("StudentRepository")
    private studentRepository: StudentRepository
  ) { }

  execute(
    params: CreateStudentData.Params
  ): Promise<CreateStudentData.Response> {
    return this.studentRepository.create(params);
  }
}