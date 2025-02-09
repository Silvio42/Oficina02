import { IStudentModel } from "./StudentModel";
import { StudentEntity } from "@domain/entities/StudentEntity";

export class StudentMappers {
  static toEntity(objectData: IStudentModel): StudentEntity {
    const data = { ...objectData };
    delete objectData._id;

    return { id: data._id, ...objectData };
  }

  static toModel(objectData: StudentEntity): IStudentModel {
    const data = { ...objectData };
    delete objectData.id;

    return { _id: data.id, ...objectData };
  }

  static toEntities(arrayData: Array<IStudentModel>): Array<StudentEntity> {
    return arrayData.map(this.toEntity);
  }

  static toModels(arrayData: Array<StudentEntity>): Array<IStudentModel> {
    return arrayData.map(this.toModel);
  }
}