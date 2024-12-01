import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export type Params = WorkshopEntity;
export type Response = WorkshopEntity;

export interface ICreateWorkshopData {
  create(params: Params): Promise<Response>;
}
