import { WorkshopAccessEntity } from "@domain/entities/WorkshopAccessEntity";

export type Params = { filters: { workshop: string; user: string } };
export type Response = WorkshopAccessEntity;

export interface IFindByIdWorkshopAccessData {
  findById(params: Params): Promise<Response>;
}
