import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export type Params = { id: string; data: WorkshopEntity };
export type Response = WorkshopEntity;

export interface IUpdateWorkshopData {
  update(params: Params): Promise<Response>;
}
