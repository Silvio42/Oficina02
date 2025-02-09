import { inject, injectable } from "tsyringe";

import * as UpdateStudentData from "@domain/data/students/IUpdateStudentData";
import { StudentRepository } from "../../../infra/repositories/mongo/students/StudentRepository";

@injectable()
export class UpdateStudentUseCase {
    constructor(
        @inject("StudentRepository")
        private studentRepository: StudentRepository
    ) { }

    execute(
        params: UpdateStudentData.Params
    ): Promise<UpdateStudentData.Response> {
        return this.studentRepository.update(params);
    }
}