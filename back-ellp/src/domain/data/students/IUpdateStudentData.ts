import { StudentEntity } from "@domain/entities/StudentEntity";

export type Params = { id: string; data: StudentEntity };
export type Response = StudentEntity;

export interface IUpdateStudentData {
    update(params: Params): Promise<Response>;
}