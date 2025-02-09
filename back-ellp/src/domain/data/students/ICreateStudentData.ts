import { StudentEntity } from "@domain/entities/StudentEntity";

export type Params = { name: string };
export type Response = StudentEntity;

export interface ICreateStudentData {
    create(params: Params): Promise<Response>;
}