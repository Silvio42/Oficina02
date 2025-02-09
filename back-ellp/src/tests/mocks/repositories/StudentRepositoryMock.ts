import { inject, injectable } from "tsyringe";

import * as CreateStudentData from "../../../domain/data/students/ICreateStudentData";
import * as DeleteStudentData from "../../../domain/data/students/IDeleteStudentData";
import * as FindAllStudentsData from "../../../domain/data/students/IFindAllStudentsData";
import * as FindStudentByIdData from "../../../domain/data/students/IFindStudentByIdData";
import * as UpdateStudentData from "../../../domain/data/students/IUpdateStudentData";
import { studentMock } from "../data/studentMock";

export class StudentRepositoryMock
    implements
    CreateStudentData.ICreateStudentData,
    DeleteStudentData.IDeleteStudentData,
    FindAllStudentsData.IFindAllStudentsData,
    FindStudentByIdData.IFindStudentByIdData,
    UpdateStudentData.IUpdateStudentData {
    studentList = [studentMock];

    async create(
        params: CreateStudentData.Params
    ): Promise<CreateStudentData.Response> {
        this.studentList.push(params);
        return params;
    }

    async delete({
        id,
    }: DeleteStudentData.Params): Promise<DeleteStudentData.Response> {
        this.studentList = this.studentList.filter(
            (student) => student.id !== id
        );

        return studentMock;
    }

    async findAll(
        _params: FindAllStudentsData.Params
    ): Promise<FindAllStudentsData.Response> {
        return this.studentList;
    }

    async findById({
        id,
    }: FindStudentByIdData.Params): Promise<FindStudentByIdData.Response> {
        return (
            [studentMock].find((student) => student.id === id) ||
            ({} as FindStudentByIdData.Response)
        );
    }

    async update({
        id,
        data,
    }: UpdateStudentData.Params): Promise<UpdateStudentData.Response> {
        const student = this.studentList.find((student) => student.id === id);
        const newstudentData = { ...student, ...data };

        this.studentList = this.studentList.filter(
            (student) => student.id !== id
        );
        this.studentList.push(newstudentData);

        return newstudentData;
    }
}

@injectable()
export class StudentRepositorySingletonMock {
    studentRepositoryMock: StudentRepositoryMock;
    constructor(
        @inject("StudentRepository")
        studentRepositoryMock: StudentRepositoryMock
    ) {
        this.studentRepositoryMock = studentRepositoryMock;
    }
}