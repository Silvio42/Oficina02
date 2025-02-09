import { IWorkshopModel } from "./WorkshopModel";
import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export class WorkshopMappers {
  static toEntity(objectData: IWorkshopModel): WorkshopEntity {
    const data = { ...objectData };
    delete objectData._id;

    return { id: data._id, ...objectData };
  }

  static toEntities(arrayData: Array<IWorkshopModel>): Array<WorkshopEntity> {
    return arrayData.map(this.toEntity);
  }
}
