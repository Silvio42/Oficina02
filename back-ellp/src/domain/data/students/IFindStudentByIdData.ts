import { StudentEntity } from "@domain/entities/StudentEntity";

export type Params = { id: string };
export type Response = StudentEntity;

export interface IFindStudentByIdData {
    findById(params: Params): Promise<Response>;
}