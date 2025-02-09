import * as CreateStudentData from "@domain/data/students/ICreateStudentData";
import * as DeleteStudentData from "@domain/data/students/IDeleteStudentData";
import * as FindByIdStudentData from "@domain/data/students/IFindStudentByIdData";
import * as FindAllStudentsData from "@domain/data/students/IFindAllStudentsData";
import * as UpdateStudentData from "@domain/data/students/IUpdateStudentData";
import { StudentMappers } from "./StudentMappers";
import { StudentModel } from "./StudentModel";

export class StudentRepository implements
    CreateStudentData.ICreateStudentData,
    DeleteStudentData.IDeleteStudentData,
    FindByIdStudentData.IFindStudentByIdData,
    FindAllStudentsData.IFindAllStudentsData,
    UpdateStudentData.IUpdateStudentData {

    async update({ id, data }: UpdateStudentData.Params): Promise<UpdateStudentData.Response> {
        await StudentModel.updateOne({ _id: id }, data);
        return this.findById({ id });
    }

    async findAll({ filters }: FindAllStudentsData.Params): Promise<FindAllStudentsData.Response> {
        const arrayData = await StudentModel.find(filters).lean();
        return StudentMappers.toEntities(arrayData);
    }

    async findById({ id }: FindByIdStudentData.Params): Promise<FindByIdStudentData.Response> {
        const objectData = await StudentModel.findOne({ _id: id }).lean();

        if (!objectData) {
            throw new Error(`Aluno com ID ${id} não encontrado.`);
        }

        return StudentMappers.toEntity(objectData);
    }

    async create(params: CreateStudentData.Params): Promise<CreateStudentData.Response> {
        const objectData = await StudentModel.create(params);
        return StudentMappers.toEntity(objectData);
    }

    async delete({ id }: DeleteStudentData.Params): Promise<DeleteStudentData.Response> {
        const objectData = await StudentModel.findOneAndDelete({ _id: id }).lean();
        
        if (!objectData) {
            throw new Error(`Aluno com ID ${id} não encontrado.`);
        }

        return StudentMappers.toEntity(objectData);
    }
}