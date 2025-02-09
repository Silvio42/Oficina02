import * as FindStudentByIdData from "../../domain/data/students/IFindStudentByIdData";
import * as FindAllStudentsData from "../../domain/data/students/IFindAllStudentsData";
import { StudentRepository } from "../../infra/repositories/mongo/students/StudentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class StudentsPresentation {
  constructor(
    @inject("StudentRepository")
    private studentRepository: StudentRepository
  ) {}

  findById(
    params: FindStudentByIdData.Params
  ): Promise<FindStudentByIdData.Response> {
    return this.studentRepository.findById(params);
  }

  findAll({
    filters,
    term,
  }: FindAllStudentsData.Params): Promise<FindAllStudentsData.Response> {
    return this.studentRepository.findAll({
      filters: {
        ...filters,
        ...(term && { name: RegExp(".*" + term + ".*", "i") }),
      },
    });
  }
}
