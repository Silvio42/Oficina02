import { StudentEntity } from "@domain/entities/StudentEntity";

export type Params = { filters: object; term?: string };
export type Response = Array<StudentEntity>;

export interface IFindAllStudentsData {
    findAll(params: Params): Promise<Response>;
}