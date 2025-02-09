import { inject, injectable } from "tsyringe";

import * as DeleteStudentData from "@domain/data/students/IDeleteStudentData";
import { StudentRepository } from "../../../infra/repositories/mongo/students/StudentRepository";

@injectable()
export class DeleteStudentUseCase {
    constructor(
        @inject("StudentRepository")
        private studentRepository: StudentRepository
    ) { }

    execute(
        params: DeleteStudentData.Params
    ): Promise<DeleteStudentData.Response> {
        return this.studentRepository.delete(params);
    }
}