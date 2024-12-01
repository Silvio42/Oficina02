import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export type Params = { id: string };
export type Response = WorkshopEntity;

export interface IDeleteWorkshopData {
  delete(params: Params): Promise<Response>;
}
