import { IWorkshopAccessModel } from "./WorkshopAccessModel";
import { WorkshopAccessEntity } from "../../../../domain/entities/WorkshopAccessEntity";

export class WorkshopAccessMappers {
  static toEntity(objectData: IWorkshopAccessModel): WorkshopAccessEntity {
    if (!objectData?._id) return {} as WorkshopAccessEntity;

    const data = { ...objectData };
    delete objectData._id;

    return { id: data._id, ...objectData };
  }

  static toEntities(
    arrayData: Array<IWorkshopAccessModel>
  ): Array<WorkshopAccessEntity> {
    return arrayData.map(this.toEntity);
  }
}
