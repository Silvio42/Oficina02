import { IVolunteerModel } from "./VolunteersModel";
import { VolunteerEntity } from "../../../../domain/entities/VolunteerEntity";

export class VolunteersMappers {
  static toEntity(objectData: IVolunteerModel): VolunteerEntity {
    if (!objectData?._id) return {} as VolunteerEntity;

    const data = { ...objectData };
    delete objectData._id;

    return { id: data._id, ...objectData };
  }

  static toEntities(arrayData: Array<IVolunteerModel>): Array<VolunteerEntity> {
    return arrayData.map(this.toEntity);
  }
}
