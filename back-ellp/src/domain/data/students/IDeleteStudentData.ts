import { StudentEntity } from "@domain/entities/StudentEntity";

export type Params = { id: string };
export type Response = StudentEntity;

export interface IDeleteStudentData {
    delete(params: Params): Promise<Response>;
}
